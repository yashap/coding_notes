#################
# Subsetting data
#################

# Basic syntax for subsetting:
# 	data[rows, columns]
# Think 'RC' -> Randy Carlyle

#######
# Let's grab some sample data from the web
#######

hsb2.small <- read.csv("http://www.ats.ucla.edu/stat/data/hsb2_small.csv")

names(hsb2.small)
##  [1] "id"      "female"  "race"    "ses"     "schtyp"  "prog"    "read"   
##  [8] "write"   "math"    "science" "socst"

# Now let's select only columns 1, 7, 8 ("id", "read", "write")
hsb3 = hsb2.small[, c(1, 7, 8)]

# Or for consecutive columns
hsb4 = hsb2.small[, 1:4]

# Or if we want specific rows, but all columns
hsb5 = hsb2.small[1:10, ]

# Or only rows where the "ses" variable is 1
hsb6 = hsb2.small[hsb2.small$ses == 1, ]

# As above, but return rows where a variable is a number of values
hsb7 = hsb2.small[hsb2.small$id %in% c(12, 48, 86, 11, 20, 195), ]

# If we want to test for multiple conditions, i.e. "ses == 3 AND female == 0", it can be convenient to use the "with" function
# 	This let's us avoid typeing "hsb2.small$whatever" a lot
hsb8 = hsb2.small[with(hsb2.small, ses == 3 & female == 0), ]

# We can also subset with the subset function
# 	This also avoids all the $ stuff
# For example, to grab all rows where "write" > 50
write.50 = subset(hsb2.small, write > 50)

# Or, if we want multiple conditions
write.1 = subset(hsb2.small, write > 50 & read > 60)

# If we also want to get specific rows, we can with the select argument
write.2 = subset(hsb2.small, write > 50 & read > 60, select = c(id, write, read))

# With select we can also grab a range of columns!
write.3 = subset(hsb2.small, science < 55, select = read:science)

# Or, finally, we can do all of the above with the standard syntax
names(hsb2.small)
hsb9 = hsb2.small[hsb2.small$ses == 3, c(1:4, 7)]
