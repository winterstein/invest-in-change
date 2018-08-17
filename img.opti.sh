#!/bin/bash
#
### Optimise Images
#

IMG_DIR="/home/$USER/winterwell/invest-in-change/webroot/img"

## Create new array files
touch $IMG_DIR/newjpgarray.txt
touch $IMG_DIR/newpngarray.txt

## Check for existing array files from last run
# If there is no previous jpgarray.txt file ...
if [[ $(find $IMG_DIR -type f -name 'jpgarray.txt') = '' ]]; then
    # We will have to first optimise the jpg files ...
    JPEG_FILES=$(find $IMG_DIR -type f -iname '*.jpg')
    for jpeg in ${JPEG_FILES[*]}; do
        jpegoptim $jpeg
    done
    # Finally, we'll record the MD5SUMS of these optimised jpg files.
    touch $IMG_DIR/jpgarray.txt
    for jpeg in ${JPEG_FILES[*]}; do
        JPGMD5OUTPUT=$(md5sum $jpeg)
        printf '%s\n' "$JPGMD5OUTPUT" >> $IMG_DIR/jpgarray.txt
    done
else #(If there IS a previous jpgarray.txt file ...)
    # Create an array from the existing jpgarray.txt file ...
    mapfile -t JPGS_IN_TXT < $IMG_DIR/jpgarray.txt
    # Create an array of the existing jpg files in $IMG_DIR ...
    JPEG_FILES=$(find $IMG_DIR -type f -iname '*.jpg')
    for jpeg in ${JPEG_FILES[*]}; do
        JPGMD5OUTPUT=$(md5sum $jpeg)
        printf '%s\n' "$JPGMD5OUTPUT" >> $IMG_DIR/newjpgarray.txt
    done
    mapfile -t JPGS_IN_DIR < $IMG_DIR/newjpgarray.txt
    # Compare the two arrays, and optimise any jpg file that is unique
    UNIQUEJPGS=$(diff $IMG_DIR/jpgarray.txt $IMG_DIR/newjpgarray.txt | grep ">" | awk '{print $3}')
	if [[ ${UNIQUEJPGS[*]} = '' ]]; then
		printf "\nNo new JPG files to optimise\n"
	else
		for jpg in ${UNIQUEJPGS[*]}; do
			jpegoptim $jpg
		done
	fi
    # Output the MD5SUMs of all of the jpg files to a new jpgarray.txt file. Because all of them are now optimised.
    JPEG_FILES=$(find $IMG_DIR -type f -iname '*.jpg')
    for jpeg in ${JPEG_FILES[*]}; do
        JPGMD5OUTPUT=$(md5sum $jpeg)
        printf '%s\n' "$JPGMD5OUTPUT" >> $IMG_DIR/jpgarray.txt
    done
fi
# Remove the 'newjpgarray.txt' file, as it is no longer needed, and contains old or null information.
rm $IMG_DIR/newjpgarray.txt
