#!/bin/bash
#
### Optimise Images
#

IMG_DIR=(webroot/img webroot/images)

## Create new array files
touch $IMG_DIR/newjpgarray.txt
touch $IMG_DIR/newpngarray.txt

#### 
## FOR JPG FILES
####
## Check for existing jpeg array files from last run
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
    rm $IMG_DIR/jpgarray.txt
    touch $IMG_DIR/jpgarray.txt
    JPEG_FILES=$(find $IMG_DIR -type f -iname '*.jpg')
    for jpeg in ${JPEG_FILES[*]}; do
        JPGMD5OUTPUT=$(md5sum $jpeg)
        printf '%s\n' "$JPGMD5OUTPUT" >> $IMG_DIR/jpgarray.txt
    done
fi
# Remove the 'newjpgarray.txt' file, as it is no longer needed, and contains old or null information.
rm $IMG_DIR/newjpgarray.txt


####
## FOR PNG FILES
####
## Check for existing png array files from last run
# If there is no previous pngarray.txt file ...
if [[ $(find $IMG_DIR -type f -name 'pngarray.txt') = '' ]]; then
    # We will have to first optimise the png files ...
    PNG_FILES=$(find $IMG_DIR -type f -iname '*.png')
    for png in ${PNG_FILES[*]}; do
        optipng $png
    done
    # Finally, we'll record the MD5SUMS of these optimised png files.
    touch $IMG_DIR/pngarray.txt
    for png in ${PNG_FILES[*]}; do
        PNGMD5OUTPUT=$(md5sum $png)
        printf '%s\n' "$PNGMD5OUTPUT" >> $IMG_DIR/pngarray.txt
    done
else #(If there IS a previous pngarray.txt file ...)
    # Create an array from the existing pngarray.txt file ...
    mapfile -t PNGS_IN_TXT < $IMG_DIR/pngarray.txt
    # Create an array of the existing png files in $IMG_DIR ...
    PNG_FILES=$(find $IMG_DIR -type f -iname '*.png')
    for png in ${PNG_FILES[*]}; do
        PNGMD5OUTPUT=$(md5sum $png)
        printf '%s\n' "$PNGMD5OUTPUT" >> $IMG_DIR/newpngarray.txt
    done
    mapfile -t PNGS_IN_DIR < $IMG_DIR/newpngarray.txt
    # Compare the two arrays, and optimise any png file that is unique
    UNIQUEPNGS=$(diff $IMG_DIR/pngarray.txt $IMG_DIR/newpngarray.txt | grep ">" | awk '{print $3}')
	if [[ ${UNIQUEPNGS[*]} = '' ]]; then
		printf "\nNo new PNG files to optimise\n"
	else
		for png in ${UNIQUEPNGS[*]}; do
			optipng $png
		done
	fi
    # Output the MD5SUMs of all of the png files to a new pngarray.txt file. Because all of them are now optimised.
    rm $IMG_DIR/pngarray.txt
    touch $IMG_DIR/pngarray.txt
    PNG_FILES=$(find $IMG_DIR -type f -iname '*.png')
    for png in ${PNG_FILES[*]}; do
        PNGMD5OUTPUT=$(md5sum $png)
        printf '%s\n' "$PNGMD5OUTPUT" >> $IMG_DIR/pngarray.txt
    done
fi
# Remove the 'newpngarray.txt' file, as it is no longer needed, and contains old or null information.
rm $IMG_DIR/newpngarray.txt
