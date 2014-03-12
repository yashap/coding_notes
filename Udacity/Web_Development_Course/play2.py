############
# Working with URLs
############

import urllib2
import urllib

p = urllib2.urlopen("http://www.google.com")

c = p.read()

print(dir(p))
# let's use really see the structure of the p object

print(p.url)
print(p.headers)
print(p.headers)
# headers is a dictionary, so we can run:
print(p.headers.items())
print(p.headers["content-type"])

e = urllib2.urlopen("http://www.example.com")
print(dir(e))
print(e.headers.items())
print(e.headers["server"])


############
# Parsing XML
############

from xml.dom import minidom
# minidom is simple and fast, though it will break if you throw a tonne of XML at it

x = minidom.parseString("""
	<mytag>contents!
		<children>
			<item>1</item>
			<item>2</item>
		</children>
	</mytag>
	""")

print(dir(x))
# it's huge!

print(x.toprettyxml())
# prints it out all pretty

print(x.getElementsByTagName("mytag"))
# one element

print(x.getElementsByTagName("item"))
# two elements

print(x.getElementsByTagName("item")[0])
# just the first item element

print(x.getElementsByTagName("item")[0].childNodes)
# it has a single text node

print(x.getElementsByTagName("item")[0].childNodes[0].nodeValue)
# 1

