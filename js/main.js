const networks={mainnet:"TFCuKahjWSwo32sUQuVrXpmQiRpapFet9e",shasta:""};var contractAddress,tronWeb,currentAddress,network,tronLinkUrlPrefix,tronfund,uid,investor,investorInfo,investmentPlan,waiting=0,timer=null,totalInvestments_=0,totalEarnings_=0,totalPaidDividends_=0;async function init(){if(void 0===window.tronWeb||!1===window.tronWeb.defaultAddress.base58)return 5==(waiting+=1)?showModal():(console.error("Could not connect to TronLink."),void setTimeout(init,1e3));setNetwork(),tronWeb=window.tronWeb,contractAddress&&(tronfund=await tronWeb.contract().at(contractAddress),currentAddress=tronWeb.defaultAddress.base58,setTimeout(__init,100),setInterval(getCurrentInvestorInfo,1e4),setInterval(watchSelectedWallet,2e3))}function showModal(){"en"===window.localStorage.language?Swal.fire({type:"warning",title:"Please login to Tron Chrome Wallet",html:'<div>\n    \t\t\t\t\t<p>Please login to Tron Chrome Wallet</p>\n              <p>If you haven\'t downloaded the web extension yet, download <a target="_blank" rel="noopener noreferrer" href="https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec"><strong>TronLink</strong></a> or <a  target="_blank" rel="noopener noreferrer" href="https://chrome.google.com/webstore/detail/tronpay/gjdneabihbmcpobmfhcnljaojmgoihfk"><strong>TronPay</strong></a> to work with Tron Fund</p>\n              <p>Make sure you are on the mainnet network and not using test network</p>\n              <p>After logging into the wallet or changing the account, please reload the page</p>\n      \t\t</div>'}):Swal.fire({type:"warning",title:"Пожалуйста, войдите в TronLink или TronPay",html:'<div>\n    \t\t\t\t\t<p>Пожалуйста, войдите в Tron Chrome Wallet</p>\n              <p>Если вы еще не загрузили веб-расширение, загрузите <a target="_blank" rel="noopener noreferrer" href="https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec"><strong>TronLink</strong></a> или <a  target="_blank" rel="noopener noreferrer" href="https://chrome.google.com/webstore/detail/tronpay/gjdneabihbmcpobmfhcnljaojmgoihfk"><strong>TronPay</strong></a> чтоб работать с Tron Fund</p>\n              <p>Убедитесь, что вы находитесь в сети mainnet и не используете testnet</p>\n              <p>После входа в кошелек или смены аккаунта перезагрузите страницу</p>\n      \t\t</div>'})}async function updateReferralLink(){const e=window.btoa("tf"+await uid);uid.toNumber()?(jQuery("#ref-link").text("https://tronfund.co/?r="+e),jQuery("#ref-link-value").val("https://tronfund.co/?r="+e),jQuery("#act-copy").show()):"en"===window.localStorage.language?jQuery("#ref-link").text("You need to invest to activate your referral link."):jQuery("#ref-link").text("Вы должны инвестировать чтобы получить реферальную ссылку.")}async function __init(){$("#contract-balance").text(numberWithSpaces(tronWeb.fromSun(await tronWeb.trx.getBalance(contractAddress)))),$("#wallet-address").text(currentAddress),await getCurrentInvestorInfo(),addEventListeners()}async function getCurrentInvestorInfo(){totalInvestments_=0,totalPaidDividends_=0,totalEarnings_=0,uid=await tronfund.getUIDByAddress(currentAddress).call(),investor=await tronfund.uid2Investor(uid).call(),investorInfo=await tronfund.getInvestorInfoByUID(uid).call(),investmentPlan=await tronfund.getInvestmentPlanByUID(uid).call(),showStats(),updateReferralLink()}async function addEventListeners(){jQuery("button.btn-invest").click(function(e){e.preventDefault(),e.stopPropagation(),invest()}),jQuery("button.btn-withdraw").click(function(e){e.preventDefault(),e.stopPropagation(),withdraw()}),jQuery("#act-copy").click(function(e){e.preventDefault(),e.stopPropagation(),copyReferralLink()})}function invest(){let e=$("#invest-amount").val().trim();if(e<=9||!isFinite(e)||""===e)"en"===window.localStorage.language?Swal.fire({type:"error",title:"Invalid TRX amount!"}):Swal.fire({type:"error",title:"Некорректная сумма в TRX!"});else{let t=parseInt(window.atob(jQuery.urlParam("r")).substring(2),10)||0,n=0;tronfund.invest(t,n).send({callValue:tronWeb.toSun(e)}).then(e=>{"en"===window.localStorage.language?Swal.fire({type:"success",title:"Transaction successful!"}):Swal.fire({type:"success",title:"Транзакция успешна!"}),$("#invest-amount").val(""),getCurrentInvestorInfo()}).catch(e=>{Swal.fire({type:"error",title:"Ops...",text:"Something went wrong!"}),console.log(e)})}}function withdraw(){parseFloat($("#withdrawable").text(),10)?tronfund.withdraw().send({callValue:0}).then(e=>{"en"===window.localStorage.language?Swal.fire({type:"success",title:"Transaction successful!"}):Swal.fire({type:"success",title:"Успешная транзакция!"})}).catch(e=>{Swal.fire({type:"error",title:"Ops...",text:"Something went wrong!"}),console.log(e)}):"en"===window.localStorage.language?Swal.fire({type:"error",title:"Your balance is empty!"}):Swal.fire({type:"error",title:"У вас недостаточно средств!"})}function copyReferralLink(){document.getElementById("ref-link-value").select();try{document.execCommand("copy")}catch(e){console.log("Unable to copy text")}}function numberWithSpaces(e,t=!1){var n;return t?((n=(e=Number(e).toFixed(t)).toString().split("."))[0]=n[0].replace(/\B(?=(\d{3})+(?!\d))/g," "),n.join(".")):((n=e.toString().split("."))[0]=n[0].replace(/\B(?=(\d{3})+(?!\d))/g," "),n[0])}function getFormatedDate(e){var t=new Date(1e3*e);return t.getFullYear()+"-"+("0"+(t.getMonth()+1)).substr(-2)+"-"+("0"+t.getDate()).substr(-2)+" "+("0"+t.getHours()).substr(-2)+":"+("0"+t.getMinutes()).substr(-2)+":"+("0"+t.getSeconds()).substr(-2)}async function showStats(){$("#contract-balance").text(numberWithSpaces(tronWeb.fromSun(await tronWeb.trx.getBalance(contractAddress)))),$("#wallet-balance").text(numberWithSpaces(tronWeb.fromSun(await tronWeb.trx.getBalance(currentAddress)),2)),$("#referral-rewards").text(numberWithSpaces(tronWeb.fromSun(investor.availableReferrerEarnings),2)),$("#ref-first-level-count").text(investor.level1RefCount),$("#ref-second-level-count").text(investor.level2RefCount),$("#ref-third-level-count").text(investor.level3RefCount),$("#paid-referral-rewards").text(numberWithSpaces(tronWeb.fromSun(investor.referrerEarnings),2)),prepareTransactionHistory(),$("#total-investments").text(numberWithSpaces(tronWeb.fromSun(totalInvestments_),2));let e=totalEarnings_+investor.availableReferrerEarnings.toNumber();$("#withdrawable").text(numberWithSpaces(tronWeb.fromSun(e),2)),$("#paid-dividends").text(numberWithSpaces(tronWeb.fromSun(totalPaidDividends_+investor.referrerEarnings.toNumber()),2)),totalInvestments_?($(".loading").hide(),$(".no_investments_row").hide(),$(".investments").fadeIn()):($(".loading").hide(),$(".investments").hide(),$(".no_investments_row").fadeIn())}function prepareTransactionHistory(){jQuery(".investments__row").remove();let e="";jQuery.each(investmentPlan[0],function(t,n){totalInvestments_+=parseInt(investmentPlan[2][t],10),totalPaidDividends_+=parseInt(investorInfo[7][t],10),totalEarnings_+=parseInt(investorInfo[8][t],10);let r,a=getFormatedDate(investmentPlan[1][t]),o=numberWithSpaces(tronWeb.fromSun(investmentPlan[2][t]),2),i=numberWithSpaces(tronWeb.fromSun(investmentPlan[3][t]),2),s=numberWithSpaces(tronWeb.fromSun(investorInfo[8][t]),4);switch(parseInt(investmentPlan[0][t],10)){case 3:r=4.2;break;case 2:r=4.1;break;case 1:r=4;break;case 0:r=3.9;break;default:r=3.9}e+=`<div class="investments__row">\n      <div>\n        <p>${a}</p>\n      </div>\n      <div>\n        <p>${o} <span>TRX</span></p>\n      </div>\n      <div>\n        <p>${numberWithSpaces(r,1)}%</p>\n      </div>\n      <div>\n        <p>${i} <span>TRX</span></p>\n      </div>\n      <div>\n        <p>${s} <span>TRX</span></p>\n      </div>\n    </div>`}),jQuery(".investments").append(e)}function setNetwork(){-1!=tronWeb.currentProvider().eventServer.host.indexOf("shasta")?(network="Shasta",contractAddress=networks.shasta,tronLinkUrlPrefix="https://shasta.tronscan.org/#/transaction/"):(network="Mainnet",contractAddress=networks.mainnet,tronLinkUrlPrefix="https://tronscan.org/#/transaction/")}function watchSelectedWallet(){if(tronWeb.defaultAddress.base58==currentAddress){var e=-1!=tronWeb.currentProvider().eventServer.host.indexOf("shasta")?"Shasta":"Mainnet";network!=e&&window.location.reload()}else window.location.reload()}jQuery.urlParam=function(e){var t=new RegExp("[?&]"+e+"=([^&#]*)").exec(window.location.href);return null==t?null:decodeURI(t[1])||0},jQuery(document).ready(async()=>{window.localStorage&&!window.localStorage.language?(window.localStorage.language="en",jQuery("header a").removeClass("active"),jQuery("header a").each(function(){$(this).attr("lang")===window.localStorage.language&&jQuery(this).addClass("active")})):(jQuery("header a").removeClass("active"),jQuery("header a").each(function(){$(this).attr("lang")===window.localStorage.language&&jQuery(this).addClass("active")})),$("#wallet-address").text("Sign in into your wallet"),$("#ref-link").text("Sign in into your wallet"),$("#contract-balance, #wallet-balance, #total-investments, #paid-dividends, #withdrawable, #referral-rewards, #paid-referral-rewards, #ref-first-level-count, #ref-second-level-count, #ref-third-level-count, .loading").text("..."),jQuery("#faq .accordion > dt > a").click(function(e){return $(this).hasClass("opened")?($(this).parent().next().slideUp(),$(this).removeClass("opened")):($(this).parent().next().slideDown(),$(this).addClass("opened")),!1}),jQuery("header a").click(function(e){jQuery("header a").removeClass("active"),$(this).attr("lang")!==window.localStorage.language?"en"===$(this).attr("lang")?window.localStorage.language="en":window.localStorage.language="ru":window.localStorage.language="en",$(this).addClass("active")}),setTimeout(()=>{init()},1e3)});
