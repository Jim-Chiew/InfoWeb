const buildwithURL = "https://builtwith.com/?";
const netcraft = "https://sitereport.netcraft.com/?url=";
const wayBackMachine = "https://web.archive.org/web/*/";
const nsLookup = "https://www.nslookup.io/domains/";

function getCurrentTab(callback) {
  browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {  //should only return 1 (the current windows that is active).
      callback(tabs[0])
  });
}

function newTabAndSearch(siteSearch, domainOnly) {
  getCurrentTab((tabToQuarry) => {
      if (tabToQuarry.url != "about:newtab"){  //ensure that tabToQuarry is not a new tab (blank url).
        if (domainOnly == true){  //if true, only quarry url domain.
          browser.tabs.create({  //create new tab
            url: siteSearch + tabToQuarry.url.split("?")[0].split("/")[2]
            });
        } else {
          browser.tabs.create({  //create new tab
            url: siteSearch + tabToQuarry.url.split("?")[0]
            });
        }
      }
  });
}

//Adds listeners to see if button is click:
document.getElementById("buildwith").addEventListener("click", () => newTabAndSearch(buildwithURL));
document.getElementById("netcraft").addEventListener("click", () => newTabAndSearch(netcraft));
document.getElementById("nsLookup").addEventListener("click", () => newTabAndSearch(nsLookup, true));
document.getElementById("WayBackMachine").addEventListener("click", () => newTabAndSearch(wayBackMachine));

document.getElementById("all").addEventListener("click", () => {
  newTabAndSearch(buildwithURL)
  newTabAndSearch(netcraft)
  newTabAndSearch(nsLookup, true)
  newTabAndSearch(wayBackMachine)
});