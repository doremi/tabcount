tabcount
========

A Google Chrome extension that can calculate the number of times you open the web page every day.

![screenshot](https://raw.githubusercontent.com/doremi/tabcount/master/screenshot.png)

![history](https://raw.githubusercontent.com/doremi/tabcount/master/screenshot-history.png)

Usage
========

This extension will save data in mongo db, so you may need a mongo db.

#### Get free mongo db online
1. Go to https://mongolab.com/ to signup a free mongo db account.
2. Select 'sandbox' plan, it's free and have 0.5 GB capacity.
3. Create a new database, for example: 'mydb'.
4. Check for API Key (it's in account page).

#### Clone
```
git clone https://github.com/doremi/tabcount.git
```

Modify `background.js`

```
var DBNAME = "mydb";    // Fill in your database name in the previous step 2.
var APIKey = "xxx";     // Fill in your API Key in the previous step 4.
```

#### Install

1. Open Google Chrome browser and go to chrome://extensions/
2. Ensure that the Developer mode checkbox in the top right-hand corner is checked.
3. Click Load unpacked extension… to pop up a file-selection dialog.
4. Navigate to the directory in which your extension files live, and select it.
5. You may see the extension works.
![screenshot](https://raw.githubusercontent.com/doremi/tabcount/master/screenshot.png)

#### View history

Just click this extension's icon, it will show the latest 7 days history.
![history](https://raw.githubusercontent.com/doremi/tabcount/master/screenshot-history.png)


Feature plan
============

1. Save data in local.
2. Plot history with more options.
 
Any ideas are welcome, please send pull request, thank you!

Reference
=========

1. https://developer.chrome.com/extensions/getstarted
2. http://icons8.com/ (I use its tomato icon)
