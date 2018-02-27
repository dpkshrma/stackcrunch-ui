# !/bin/bash

# gzip all files
gzip -r -9 build

# Remove gz extensions from all built files
for file in `(find build -type f -name '*.gz')`;
do
  mv $file ${file%.gz};
done
