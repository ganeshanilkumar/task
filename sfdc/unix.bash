cat <filename>  shows all teh content in file
cat build.xml > ba.txt  over write the from the 1st file in 2nd file by removing the data
cat build.xml >> ba.txt  write at the end of 2nd file 
find -iname <filename>  To search for a file
grep -i "anil" *.txt  It will search content as anil in file and shows the file name 
find . -type d -empty  --> to find all the empty ffolders in directory
find . -type f -empty  --> to find all the folders which have some files only an dit wont show any empty folders

find . -type d -print|while read DIR
do
	cd "${DIR}"
	if [ -f *.pdf ]
	then
		echo "${DIR}"
	fi
done

mkdir anil ; while read -r line ; do mv "$line" anil ; done<hi.txt