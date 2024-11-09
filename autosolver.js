// The almost autosolver for https://neal.fun/password-game/
// copy the code into your browsers console
// current time might be an issue conflicting with rule 5
const { max, min } = Math;
const delay = 5;
const levels = [];
levels[0] = ["hi"];
levels[0] = ["0ImayXXXVshellBe€997"];
// Your password must be at least 5 characters.
levels[1] = ["hello"];
// … include a number.
levels[2] = ["hell0"];
// … include an uppercase letter.
levels[3] = ["Hell0"];
// … include a special character.
levels[4] = ["H€ll0"];
// The digits in your password must add up to 25.
levels[5] = ["H€ll", sum25];
// Your password must include a month of the year.
levels[6] = ["H€may", sum25];
// … include a roman numeral.
levels[7] = ["I€may", sum25];
// … include one of our sponsors: …
levels[8] = ["I€mayshell", sum25];
// The roman numerals in your password should multiply to 35.
levels[9] = ["I€XXXVmayshell", sum25];
// Your password must include this CAPTCHA...
levels[10] = ["I€XXXVmayshell", captcha, sum25];
// … include today's Wordle answer.
levels[11] = ["I€XXXVmayshell", captcha, wordle, sum25];
// … include a two letter symbol from the periodic table.
levels[12] = ["ImayXXXVshellBe€", captcha, wordle, sum25];
// … include the current phase of the moon as an emoji.
levels[13] = ["ImayXXXVshellBe€", moon, captcha, wordle, sum25];
// … include the name of this country.
levels[14] = ["ImayXXXVshellBe€", moon, captcha, wordle, country, sum25];
// …  include a leap year.
levels[15] = ["0ImayXXXVshellBe€", moon, captcha, wordle, country, sum25];
// …  include the best move in algebraic chess notation.
let moonToChess = [moon, captcha, wordle, country, chess];
levels[16] = ["0ImayXXXVshellBe€", moonToChess, sum25];
// 🥚 ← This is my chicken Paul. He hasn't hatched yet, please put him in your password and keep him safe.
levels[17] = ["🥚0ImayXXXVshellBe€", moonToChess, sum25];
// The elements in your password must have atomic numbers that add up to 200.
levels[18] = ["🥚0ImayXXXVshellBe€", moon, moonToChess, sum25, atom];
// All the vowels in your password must be bolded.
levels[19] = ["🥚0ImayXXXVshellBe€", moonToChess, sum25, atom];
// Oh no! Your password is on fire. Quick, put it out!
levels[20] = levels[19];
// Your password is not strong enough 🏋️‍♂️
levels[21] = ["🥚🏋️‍♂️🏋️‍♂️🏋️‍♂️0ImayXXXVshellBe", moonToChess, sum25, atom];
// … must contain one of the following affirmations: ...
let text = "🥚🏋️‍♂️🏋️‍♂️🏋️‍♂️0IamlovedmayXXXVshellBe";
levels[22] = [text, moonToChess, sum25, atom];
// Paul has hatched … 🐛🐛🐛🐛
text = "🐛🐔0🏋️‍♂️🏋️‍♂️🏋️‍♂️101IamlovedmayXXXVshellBe";
levels[23] = [text, moonToChess, sum25, atom];
// Your password must include the URL of a X minute Y second long YouTube video.
levels[24] = [text, moonToChess, youtube, sum25, atom];
// A sacrifice must be made. Pick 2 letters that you will no longer be able to use.
levels[25] = [text, moonToChess, youtube, sum25, atom, , sacrifice];
// Your password must contain twice as many italic characters as bold
levels[26] = [text, moonToChess, youtube, sum25, atom];
// At least 30% of your password must be in the Wingdings font.
levels[27] = levels[26];
// Your password must include this color in hex.
text = "🐛🐔🏋️‍♂️🏋️‍♂️🏋️‍♂️101IamlovedmayXXXVshellBe"; // hex color must have /[a-f]0[a-f]/
let moonToHex = [moonToChess, youtube, hexColor];
levels[28] = [text, moonToHex, youtube, sum25, atom];
// All roman numerals must be in Times New Roman.
// The font size of every digit must be equal to its square.
// Every instance of the same letter must have a different font size.
levels[31] = levels[30] = levels[29] = levels[28];

// Rule 32 Your password must include the length of your password.
// Rule 33 The length of your password must be a prime number.
//  Rule 34 Uhhh let's skip this one.
levels[32] = [text, moonToHex, sum25, atom, fill];
levels[34] = levels[33] = levels[32];

// Rule 35 Your password must include the current time.
text = "🐔🏋️‍♂️🏋️‍♂️🏋️‍♂️101IamlovedmayXXXVshellBe";

levels[35] = [text, hhmm, moonToHex, sum25, atom, fill, final];

const state = window._state ?? {};
window._state = state;
init();
function init() {
    if (!window?.Chess)
        document.head.appendChild(
            Object.assign(document.createElement("script"), {
                src: "https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js",
            })
        );
    state.target = document.querySelector(".ProseMirror");
    state.update = debounce(update, delay);
    const hole = document.querySelector(".password-label");
    let msg = document.createElement("div");
    msg.innerHTML = `<details id='help'>
    <summary>❓</summary><ul>
    <li>
  🧪 The autosolver is experimental, just restart if it breaks.</li><li>
⚠️ It uses online resources that may take some time or fail,
    e.g. while solving the chess problem, geo guessing.</li><li>
⚠️ YouTube IDs can conflict with the atoms summing to 200 (rule 18).</li><li>
⚠️ Current time o. captcha might be an issue conflicting with rule 5.</li><li>
💡 Sometimes deleting a part of the password may help.</li><li>
💡 Copy the password before proceeding with final step.</li></ol>
</details>`;
    hole.appendChild(msg);
    state.plain = document.createElement("pre");
    state.plain.style.backgroundColor = "#ddffdd";
    state.plain.style.padding = "1ex";
    state.plain.style.whiteSpace = "pre-wrap";
    state.plain.style.overflowWrap = "break-word";
    state.plain.style.wordBreak = "break-all";
    help.appendChild(state.plain);
    state?.observer?.disconnect();
    state.observer = new MutationObserver(state.update);
    state.observer.observe(document.body, {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true,
    });
    state.update();
    return state;
}
function update() {
    console.log(state.stop);
    if (state.stop) return;
    const ruleElements = [...document.querySelectorAll(".rule-top")];
    const rules = ruleElements.map((x) =>
        Number(x.innerText.replace(/\D/g, ""))
    );
    const level = max(0, ...rules);
    const iq = levels.length - 1;
    const unsolved = [...document.querySelectorAll(".rule-error")].map((x) =>
        Number(x.innerText.replace(/\n(.|\n)*/g, "").replace(/\D+/g, ""))
    );
    state.level = level;
    state.password = "";
    const handlers = levels[min(level, levels.length - 1)].flat(Infinity);
    for (const handler of handlers) {
        if (typeof handler === "string") {
            state.password += handler;
        } else {
            state.password += handler(state.password);
        }
    }
    let formatedPassword = state.password;
    if (level >= 19) formatedPassword = format(state.password);
    if (
        state.target.innerText != state.password ||
        formatedPassword != state.lastPassword
    ) {
        state.target.innerHTML = state.lastPassword = formatedPassword;
        state.plain.innerText = state.password;
        console.log(state.level);
    }
}
function shuffle() {
    state.youtubeDiff = Math.floor(Math.random() * 3) - 1;
    state.update();
}
// handlers
function sum25(password) {
    return (
        "997:996:995:994:993:992:991:99:98:97:96:95:94:93:92:91:9:8:7:6:5:4:3:2:1:".split(
            ":"
        )[
            [...password]
                .filter(Number)
                .map(Number)
                .reduce((a, c) => a + c, 0)
        ] ?? "🔢⚡"
    );
}
function captcha() {
    const captchaElement = document.querySelector(".captcha-img");
    const src = captchaElement.src; // https://neal.fun/password-game/captchas/mm3nn.png
    const match = src.match(/([a-z0-9]{5})\.png/)[1];
    if (match.match(/[0-9]/)) {
        document.querySelector(".captcha-refresh").click();
        state.update();
    }
    return match;
}
function wordle() {
    const date = getCurrentDate();
    if ((!state.date || state.date != date) && !state.fetchingWordle) {
        state.fetchingWordle = true;
        fetch(`https://neal.fun/api/password-game/wordle?date=${date}`)
            .then((r) => r.json())
            .then((data) => {
                state.date = date;
                state.wordle = data.answer;
                state.fetchingWordle = false;
            });
    }
    return state.wordle ?? "[solving wordle...]";
}
function moon() {
    const moonPhases = [
        "🌘",
        "🌑",
        "🌒",
        "🌓",
        "🌔",
        "🌕",
        "🌖",
        "🌗",
        "🌘",
        "🌑",
    ];
    if (state.level === 13) {
        state.moonIndex ??= -1;
        state.moonIndex++;
        state.moon = moonPhases[state.moonIndex];
    }
    return state.moon;
}
function country() {
    if (!state.country && !state.fetshingCountry) {
        state.fetshingCountry = true;
        const geo = [...document.querySelectorAll(".geo")][1];
        if (!geo) {
            return (state.fetshingCountry = false);
        }
        const src = geo.src;
        const matches = src.match(/!1d([^!]+)!2d([^!]+)/);
        const latitude = matches[1]; // Extracted longitude
        const longitude = matches[2]; // Extracted latitude
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&accept-language=en&lat=${latitude}&lon=${longitude}`;
        fetch(url)
            .then((r) => r.json())
            .then((data) => {
                state.country = data.address.country.toLowerCase();
                state.fetshingCountry = false;
            });
    }
    return state.country ?? "[geogessing country ...]";
}
function chess() {
    if (!state.chess) {
        fetchChess();
    }
    return state.chess ?? "[playing chess ...]";
}
function atom(password) {
    let a =
        "#:H:He:Li:Be:B:C:N:O:F:Ne:Na:Mg:Al:Si:P:S:Cl:Ar:K:Ca:Sc:Ti:V:Cr:Mn:Fe:Co:Ni:Cu:Zn:Ga:Ge:As:Se:Br:Kr:Rb:Sr:Y:Zr:Nb:Mo:Tc:Ru:Rh:Pd:Ag:Cd:In:Sn:Sb:Te:I:Xe:Cs:Ba:La:Ce:Pr:Nd:Pm:Sm:Eu:Gd:Tb:Dy:Ho:Er:Tm:Yb:Lu:Hf:Ta:W:Re:Os:Ir:Pt:Au:Hg:Tl:Pb:Bi:Po:At:Rn:Fr:Ra:Ac:Th:Pa:U:Np:Pu:Am:Cm:Bk:Cf:Es:Fm:Md:No:Lr:Rf:Db:Sg:Bh:Hs:Mt:Ds:Rg:Cn:Nh:Fl:Mc:Lv:Ts:Og".split(
            ":"
        );
    let b = a.map((v, i) => [v, i]);
    let c = b.reduce((a, [x, y]) => ((a[x] = y), a), {});
    let regexp = b
        .sort((a, b) =>
            b[0].length == a[0].length ? a < b : b[0].length - a[0].length
        )
        .map(([x, y]) => x)
        .join("|");
    let matches = password.match(new RegExp(regexp, "g"));
    let sum = matches.reduce((a, x) => a + c[x], 0);
    let diff = 200 - sum;
    let add = "";
    while (diff > 0) {
        let i = Math.min(diff, 118);
        while (i > 1 && a[i].match(/[IVXLCDM]/)) i--;
        add += a[i];
        diff -= i;
    }
    return add;
}
function youtube() {
    let m = document.body.innerText.match(/(\d+)\s*minute(\s*(\d+)\s*second)/);
    let [_, min, __, sec] = m.map(Number);
    let a =
        "4iORuByyRmA:y2frxNQgsOQ:y2frxNQgsOQ:wtqzSTi4zQQ:wtqzSTi4zQQ:J2I2vQQwiyE:xwuyBTTuUrQ:tPSBj4Quuwk:HPlBcPvJQew:vqlcBxgYnFo:vqlcBxgYnFo:Zx_iiQAH-Tw:uawO3-tjP1c:uawO3-tjP1c:xepkylNIenw:xepkylNIenw:krqmxbffbTE:t-3-guBJswY:t-3-guBJswY:ZSv1iiT3jlc:HduubRTdko4:yRQ1QZs7Q0w:AedxizpHQ4A:J_QEigiJcsQ:J_QEigiJcsQ:yFfcsmK2TOA:z2bqfIdTtwE:z2bqfIdTtwE:tk2O_dPRSqw:u-oIZfasENg:u-oIZfasENg:cdnOG2TQwHA:ahBmRREpqiI:ahBmRREpqiI:KEFs4o-uGEA:Q-GEwZGu_OA:Q-GEwZGu_OA:lZwt3xbuEJQ:bm-ummtKNOw:itBuZqROGoc:y_fzxkP1Ysc:ygHP_BmszQ_:ygHP_BmszQ_:e1cpwxneseQ:ompeR1pJlaQ:rbREmmg1wRc:aTwhiJfyoOE:aTwhiJfyoOE:rdIiiwhasyQ:rdIiiwhasyQ:zo1Hd3tozKs:evdgGExIgio:evdgGExIgio:xeTZz1dh3_w:uephBmkupvQ:uephBmkupvQ:xiuuKQroPHc:xiuuKQroPHc:lfGwR1gaQYo:t4gkmcmwBrw:sxssAArYRGA:sxssAArYRGA:obTE4aTynIo:obTE4aTynIo:3ucrwgmeBtk:OxwNHQplFpo:OxwNHQplFpo:pEoYAeJ_gOk:m2cOKpkvN2c:oueYkBT22Pw:zYsPTBq2aEw:zYsPTBq2aEw:wivuhAAxlec:wivuhAAxlec:QRqiOaiwteE:yPwOl5BIjos:vx2Q1Nas1Qs:vx2Q1Nas1Qs:mmQ1akRwxBs:-bcANEglbI_:-bcANEglbI_:uxzBq4Y_fNw:v_xPZuAfg1k:edHesrFRpQg:edHesrFRpQg:tpmAholHR1w:xsJopwNT2fs:xsJopwNT2fs:hZARIbmubgo:zydZQOR_lwQ:ccQAgyqxqQQ:ccQAgyqxqQQ:xGcyrucn3fI:xGcyrucn3fI:jJdZJ1GwjxA:jJdZJ1GwjxA:dSxxsnOc3w0:ugcPtZyxZ6E:zW8fpEOOw0w:zW8fpEOOw0w:cyTxxEhS4uc:OGkQQ_q_HYg:OGkQQ_q_HYg:wP-O4JlKclc:w-s3NTuw-To:w-s3NTuw-To:vNExj-bJIgs:vNExj-bJIgs:bxbPOqJBjFo:bxbPOqJBjFo:zpu2JwTxf_o:zpu2JwTxf_o:xohyFEGR2hg:sEZ_dHGN4yw:stsnuh3kFGE:uukzTxpfYyg:uukzTxpfYyg:vgSbuFawtfw:vgSbuFawtfw:wnO0H8sBgRY:-_drvG3kKw_:Bbl-AnunGpc:Bbl-AnunGpc:lnFHlfwRSys:cTAntdHvbYw:cTAntdHvbYw:zEhfHOZQjoc:zEhfHOZQjoc:b4vmFxGpvuc:b4vmFxGpvuc:kA4bGJmAEhc:acmwKwchOPg:acmwKwchOPg:uKzp_cyvwv4:jiEvibbf-hI:jiEvibbf-hI:ZqcSccSchg_:iskjEgwj4uQ:bwBQPpGPves:bwBQPpGPves:bAff-sGw-Kk:PjF11baJ2ew:z_e1slzjAow:z_e1slzjAow:zd1hk3vxwZU:wpbsaypZlhg:wpbsaypZlhg:eyupkrpm1oc:GowJeGcf_Kk:OtKmFttytQ_:pOQfqiEdKKw:pOQfqiEdKKw:djmec-Bweeg:djmec-Bweeg:wBytqPGninQ:wBytqPGninQ:yTOaO2T2lPA:uff1toooAxk:nduA4gTkKgc:ltfPxiTGauk:ltfPxiTGauk:RAimv4eiwxs:ylcscJNBm_Y:ylcscJNBm_Y:gjQ4vaYySkw:gjQ4vaYySkw:ysjYp1NBFyw:ysjYp1NBFyw:rudzYPHuewc:qo3iQvnisTk:hslYEQ-Rx1s:PrJJdJummvA:wFPvPA1afrQ:wFPvPA1afrQ:uw4Ikdcjpgg:Nau-vgnHuHA:Nau-vgnHuHA:PyPf-KsGqjs:neHuNY-w2fg:igtvbriAYmc:igtvbriAYmc:fJaEmBTZj_s:OeHlFSiTAPk:OeHlFSiTAPk:yKb_hZQFgKA:yKb_hZQFgKA:hcEk_zmwImg:prt1bk2B-gs:ebTrld_dRpA:pKwsPBeSiOc:pKwsPBeSiOc:mlqAvhjxAjo:mlqAvhjxAjo:sPcghmmjxio:sPcghmmjxio:GcHOn-EEiBc:kGp_vJq-2aw:cT-jGQ2bpgg:gQSabq2fGhY:oQbOHPHwPxQ:oQbOHPHwPxQ:cglhnfbbSdg:cglhnfbbSdg:kkbbeWggqsQ:o-swhAjntvA:o-swhAjntvA:xp1u2RlpoxQ:QtsElPKywqg:QtsElPKywqg:kg1_uS_bZig:kg1_uS_bZig:PKtnafFtfEo:NfOAAf4kFOo:auHEjieszAo:qoxjzGypOAA:wQidAZQhxbA:wQidAZQhxbA:KoTfcR2QKGs:vu_Busuilos:yqaQJ_tmbPA:yqaQJ_tmbPA:wdiolszkeio:wdiolszkeio:zS4mavnAaiQ:codpbgGpcqQ:codpbgGpcqQ:NffmujESqNw:O3GBsa1-dKs:O3GBsa1-dKs:o2rn1bwHHRE:qh-hkHuc_wE:qh-hkHuc_wE:fpaxvjFh-qA:EqHKcpvxllc:hgZelygG_qY:hgZelygG_qY:rekcqRG1wmY:GtQPsyEHHZQ:GtQPsyEHHZQ:YHrbH2dQHEc:YHrbH2dQHEc:x5KeK3ARrPY:cofteQs2RyA:cofteQs2RyA:j-gtbGpTteQ:j-gtbGpTteQ:lSs-ubhPGQE:lSs-ubhPGQE:QBbelnfEeHE:s_alotsHliA:s_alotsHliA:sPBJihaYspg:sPBJihaYspg:bfFfvgqtoyE:GTtce3rJxhc:ooBvzeguzBc:ooBvzeguzBc:dtNbOpGOjmw:dtNbOpGOjmw:hGiNRlmpids:hGiNRlmpids:QdJzibQuyHE:wwr6EgxeevE:ayh_QbtJftI:ayh_QbtJftI:sfP1OqtggSk:fbxyqeIylHE:ttldaEHlZZs:ttldaEHlZZs:IgRrcpwwzE4:IgRrcpwwzE4:khOZ_EtkhOY:khOZ_EtkhOY:eeeGsxpOjNQ:vw2uOljxgTA:vw2uOljxgTA:yyyhxRztamE:yyyhxRztamE:zRyHGy4rFqY:zRyHGy4rFqY:QjealGtlKjQ:suN_4cZN-ao:suN_4cZN-ao:To4xdjsxQAg:Nev2-f2cfjo:jG-zo_oA2jo:jG-zo_oA2jo:ryFvH4Ejaxo:ryFvH4Ejaxo:d1kwJtkFtwA:kiTTAbeqQKY:kiTTAbeqQKY:QPhcbZriB4o:bdiGlNbz_Qc:bdiGlNbz_Qc:l_GAF_fy2SA:l_GAF_fy2SA:nYcnhe_y21g:nYcnhe_y21g:ZqGesno_FiQ:TZOmpbGz-vs:qommxIcfoos:qommxIcfoos:JxvG4rBQePs:dnFSRNgtH2Q:dnFSRNgtH2Q:-pFKsqGyu_s:-pFKsqGyu_s:1tseQzv3_IE:wNN-TRirvHY:wNN-TRirvHY:bthHZpjdJi4:bthHZpjdJi4:qrfnaR4adiI:qrfnaR4adiI:BROKEN_____:BROKEN_____:KFwOQ4_nv-c:ZEwAkZq1ZsA:ZEwAkZq1ZsA:SfJc-FB4dbQ:hYJJHvwitfE:hYJJHvwitfE:QBgqntNfsTo:QBgqntNfsTo:HQavntn-snc:dvq-ixRvwGA:dvq-ixRvwGA:bZ2Fxmxpots:bZ2Fxmxpots:hgfzxaFOyqw:hgfzxaFOyqw:brcBPJj2Qgw:xeK-B4iPxvo:bqtqltqcQhw:bqtqltqcQhw:OBGFxlkfOdE:OBGFxlkfOdE:gAEOeYkfG_w:gAEOeYkfG_w:lJJvcG4_vSA:Ymqkj3hlqGA:Ymqkj3hlqGA:szE4qGfdHzE:szE4qGfdHzE:lROkdtcGFHw:mQqRtaoyAdw:mQqRtaoyAdw:RGhydvSY_Aw:RGhydvSY_Aw:FgvATdNQeOc:FgvATdNQeOc:FtBfPQymvdE:FtBfPQymvdE:u3qbwIl1l-Q:u3qbwIl1l-Q:haaqZflhemo:vwuQPfvSSlo:vwuQPfvSSlo:qroAEArkSPk:qroAEArkSPk:ia__-tHQPvc:ia__-tHQPvc:lhAgaRzAEGg:xPEjZYQaxus:iwTOEASFyfk:iwTOEASFyfk:qytSTZ_ebyQ:qytSTZ_ebyQ:osgjyexGTEo:osgjyexGTEo:dZbu_Qe-tdg:oT3uuggQqcg:roRHdPhvjao:roRHdPhvjao:dNxyFtqcNss:dNxyFtqcNss:johRpvcEmQc:johRpvcEmQc:paaz_y-v1eQ:paaz_y-v1eQ:fRouYd-o_Ew:fRouYd-o_Ew:cOmh_Yqpqts:yfTiSyiAj3k:yfTiSyiAj3k:va-YHeytvFQ:va-YHeytvFQ:tysZObbs4Yo:tQiiaFE1e-Y:qiNcEguuFSA:qiNcEguuFSA:mBbHfjoz1ow:iNuzxoz50ZE:j2_dJY_mIys:tK1npHenASc:sYiP-nqdwaA:sYiP-nqdwaA:RS_TrEbaizg:npTphztFoac:fGhp_dvtjQY:qkdBEwfQBxQ:qkdBEwfQBxQ:mxeqhcEbySw:mxeqhcEbySw:qpsuEjycnFo:ZlAd-KK_T-s:ohJPiBdbbbA:ohJPiBdbbbA:pvxe21suhGw:xlpqeREimKg:xlpqeREimKg:fjEB_wbemQA:fjEB_wbemQA:q-zcIvdJxoo:q-zcIvdJxoo:opRzhzxwamc:fh-pnqjnuyw:fh-pnqjnuyw:sBehb_Fa_qg:sBehb_Fa_qg:zg1HB_fPvtQ:pbxvhASkYwk:pbxvhASkYwk:wzziKyoo-ao:_fdAeTdlBpw:_fdAeTdlBpw:Al_xpzOZtgg:wpAwdsubl1w:pHTwllpq4oA:pHTwllpq4oA:vrjAIBgxm_w:vrjAIBgxm_w:vNlaEFc_qrg:vNlaEFc_qrg:qQ1celvPNzs:GTfyvmfTzzg:GTfyvmfTzzg:fmwZyqtmopY:fmwZyqtmopY:Ktbp-aoETEY:G_tqJoog-tY:vypvgkmZxkg:cjlpEtzxhTI:cjlpEtzxhTI:Av-jbmBPEgw:Av-jbmBPEgw:uTkQbSQpJew:uTkQbSQpJew:iFE1bkuBotk:ObOEc_J-mHE:ObOEc_J-mHE:F13ec-aTdRw:xAjjipdlrHQ:bOoHTxjJufY:bOoHTxjJufY:ywgKfdBmAfs:ywgKfdBmAfs:wvoQmf_Qplc:wvoQmf_Qplc:_w-lhmbhnQc:fcARdYz1rrw:fcARdYz1rrw:r1aodO2-SEg:r1aodO2-SEg:nuATcGhzExE:zBn3bdNONnw:zBn3bdNONnw:yxzaFgu4_fE:yxzaFgu4_fE:RsvF_BcggPc:yeg_YGpxlik:yeg_YGpxlik:wAaov-ubjfE:wAaov-ubjfE:viiEHzz2EkA:viiEHzz2EkA:He1RzEIxptE:K2xjowl_iQE:sxtbcOEtpoE:sxtbcOEtpoE:wITJjjnyejg:wITJjjnyejg:lmrcqtbeppQ:lmrcqtbeppQ:wRPAqxJY3lo:yycbqNcvHE_:yycbqNcvHE_:uZuzsBHBmvQ:uZuzsBHBmvQ:tbqarAFGspE:tbqarAFGspE:uPZplwAtynw:vxF1osPkplA:iuuFivEbHus:iuuFivEbHus:F-wlKiaP-Go:qvdHvb_uR_Q:qvdHvb_uR_Q:byxEledFpEE:byxEledFpEE:pSatdrqfgjs:_GrBFSNsfmo:iBjhQ4kddyI:oyrNH_megrs:v2Aeto_oxjg:vf_2eGRBllA:vf_2eGRBllA:TpeTyjhtkgg:nGylcQTShac:wEQvx-wpcrc:wEQvx-wpcrc:GlSqTuuvfdg:GlSqTuuvfdg:BQ-koxE_Q_Y:xcknq-wQn3E:JavlibhEfgA:JavlibhEfgA:NTicAwls-cA:NTicAwls-cA:mvw-ohFc_GY:mvw-ohFc_GY:JOpauE_EEjE:JOpauE_EEjE:steK1_mu1SE:tFRidwwRlJY:he_P_a_EbAk:he_P_a_EbAk:wxGRGpBaaAo:wxGRGpBaaAo:jfNyBYJxx2g:yjOx-dpY-_o:yjOx-dpY-_o:ljd-_rAay4A:ym1QkZgY3-w:ym1QkZgY3-w:wBgqAKxujkE:wBgqAKxujkE:EvwudGaJS4c:nBGOYJTEN2A:xdqQquPvKBQ:xdqQquPvKBQ:jNsPTgA4nds:i-FYgfgn4_k:pt4-OubbcJc:pt4-OubbcJc:htsjQHeFyTE:htsjQHeFyTE:fqyZ2SidAfY:teJcxglGzes:mYqSotmAkeg:mYqSotmAkeg:hsxz3uHPlOQ:t4OumncEiKo:t4OumncEiKo:qSQRx1gveFE:suhfO-m4QGY:suhfO-m4QGY:oFGggkdppco:taQtqlwpoRs:taQtqlwpoRs:gQwxngpah-s:gQwxngpah-s:eeklduOaEt8:ffutRhsopwo:ffutRhsopwo:vnfqhGPyOF4:v1dph3AJ-ck:v1dph3AJ-ck:PhtcaxqzFcA:PhtcaxqzFcA:nxNBKdKn-Ew:tfxdonEmtTc:tfxdonEmtTc:gjvkyHhhAyY:NaFeEcpxobA:NaFeEcpxobA:zzKpFHEqO4w:lvkwizbyBBY:zSdqfvwFGmQ:zSdqfvwFGmQ:wP1moQm40yE:kn4mpvbmdyw:kn4mpvbmdyw:xtkyztGmPQs:-HiGJJsghyA:-HiGJJsghyA:zkokOkg1piQ:ylbQeBpp3Qk:ylbQeBpp3Qk:jBuqOyGuGlA:jBuqOyGuGlA:gKxcjqgHiFo:zapJeJZvyAg:tvmFomyhEYs:tvmFomyhEYs:fj3iywbEb1Q:vqloAjgr3mo:yxuFZiwzHG4:uNq_Q-bgq_g:uNq_Q-bgq_g:oaJf2uxK_uA:q_yoh-KbqQY:q_yoh-KbqQY:xGiS2ZQirdo:y3GkxuJyYcs:y3GkxuJyYcs:kwSTiTkuhf4:whlRToeJ1bA:whlRToeJ1bA:PF-RHtRc2Go:PF-RHtRc2Go:Kl4oomaSllo:eqP1P1PQpJc:eqP1P1PQpJc:H-mJEc_2_Tg:A-eARjipxOE:PTtgupSquxg:PTtgupSquxg:G-aPgqpjGEc:G-aPgqpjGEc:xxSFFpeTpdQ:xxSFFpeTpdQ:oEmsYnkqFns:TibAhnZTAqg:TibAhnZTAqg:zH51oPE0Q-I:bwIlGZodBfw:bwIlGZodBfw:pZl2rOvRxsc:wSRcydgxkxg:wSRcydgxkxg:vhw_inkc-AE:zpvZJOOAbbA:zpvZJOOAbbA:-wrAwGKqeus:wStBid4mkno:x_uliInbqhk:x_uliInbqhk:hlGid_tskJk:wFHHjGkxFGY:wFHHjGkxFGY:zaumyfPx3Ao:zaumyfPx3Ao:Gv3ucNH1zYE:Gv3ucNH1zYE:ZcEAoZEoohE:ZcEAoZEoohE:oNxGFNaJByg:uZ4tdfqYxNs:udQRhdf4uQs:udQRhdf4uQs:ndK-itPSvBs:gykmon_em2A:p_xhAqbiz3A:yqdlruxh1tI:yhdmgjJ_QSE:yhdmgjJ_QSE:ebTEOGvnuwc:ebTEOGvnuwc:PvPTuiHcTyg:kvdu3GlqiAQ:miqZIZzHtwE:miqZIZzHtwE:evvumjwAvTQ:evvumjwAvTQ:vemghwoyAJI:vemghwoyAJI:zz1qITOyxSc:cGyyQfsvN-Y:cGyyQfsvN-Y:wSTxws1kAdo:wSTxws1kAdo:fmvdtJetwbQ:fmvdtJetwbQ:gsF-BQP-bQo:rrPhAsiRiQQ:rrPhAsiRiQQ:EigOKPTqpmQ:EigOKPTqpmQ:GBouxGf-T-w:qHPjiduaSEo:qHPjiduaSEo:ydt_pRraJOc:fPHQQzJPlhc:fPHQQzJPlhc:ce1udO-OGQA:NF1gdujhPls:Px4vnbuelxs:tGjoqjbOusg:tGjoqjbOusg:luRyhE2rwug:yu_aBPlGRBc:yu_aBPlGRBc:ExPqGQyJPJw:ExPqGQyJPJw:sitHTBQPsRc:sitHTBQPsRc:lAyGvbBxwhc:qciqozxAgaQ:qciqozxAgaQ:nsNynguyBGk:feOqpcJ-zTA:FzEewEh_EHw:FzEewEh_EHw:4_ayqZGs_qz:TKPqu-wktBw:TKPqu-wktBw:31ojdfiHblA:nFElHizOHu4:fboozhIoyEw:lcYpf-_tqZc:lcYpf-_tqZc:xSdlAkwhEEk:xSdlAkwhEEk:-wxjxtxGYhk:BfPT4ixsxjA:yeZuyI1m2Jg:sffqPRiApSc:sffqPRiApSc:_bHpmaF-qts:hegAK-TNNgg:cPivZQZpbfA:cPivZQZpbfA:wYxcdqyBl3c:EGhcZlE-4Hk:tsistTTK1YQ:tsistTTK1YQ:oEdhYqfs3hg:oEdhYqfs3hg:S-KZ4BbEKco:zuTd2fUxHyg:prakKhiPfvE:RoFSqtrivFs:RoFSqtrivFs:qeJ-undA_iI:duOFuPFbGGQ:duOFuPFbGGQ:Jdo2Kqusdw_:Tv1QbjNyPJA:Ouivipy-ZNE:zJTJ3HYxySw:KkdBEBKuabk:olhcjYtFxmg:olhcjYtFxmg:emFaiNYr-dE:zwdvQbUhsq0:giOBEZvZQoE:giOBEZvZQoE:Pkl_lA1j_Eo:Pkl_lA1j_Eo:vwiOoTNvtBQ:vwiOoTNvtBQ:OlnmOBHwjNg:a2rKgybGP_w:rRrSaNH-R-A:rRrSaNH-R-A:cZGZYn2qq1Q:cZGZYn2qq1Q:seakAbF1Jfo:xzGBZudNwOY:xzGBZudNwOY:tfnFNvmwJxY:i-mwGpGvfjY:i-mwGpGvfjY:qTuF2ljzJlA:tS6m2kY-Epk:tS6m2kY-Epk:cf2T_Skq1xc:mGHmYgkmJFs:bEOEQYiGFGs:bEOEQYiGFGs:sveFnwpKmPw:r2mlfuaebxc:ibddibakbSs:ibddibakbSs:dAztcH-zZQg:SpRvSR_oJJ4:uPHlSrR1kbE:oyah-NEt_BY:oyah-NEt_BY:qcugnluNcfo:qcugnluNcfo:lakfertrSTQ:GlQBnTgGous:b-yQwvPetQY:b-yQwvPetQY:otolHzENH3w:otolHzENH3w:uly-adxeZGk:uly-adxeZGk:zeOmSyiJqq4:zeOmSyiJqq4:HmaTAbyR-zE:ds_qcOBjtio:ds_qcOBjtio:dkHyH_t3_Pg:dkHyH_t3_Pg:jjIHvGAGwQ4:jjIHvGAGwQ4:EanOeKoT__E:EanOeKoT__E:rtHwxdBaEoA:rtHwxdBaEoA:lz-aAipGlZE:qn3srYvQpbs:e2ZnNfl_aeE:whkmB2trAak:whkmB2trAak:ougmhvyA_d4:tIimjsilduE:tIimjsilduE:v2QuiEZilas:v2QuiEZilas:I31dZqBJsww:_vSBqlplZEo:_vSBqlplZEo:zjhhBdusfmY:xtu-3oecteo:xtu-3oecteo:rZlGStO_EPs:rZlGStO_EPs:laGttpuPnwQ:laGttpuPnwQ:jkcydFx_gYo:zAyqABGsZqQ:zAyqABGsZqQ:qgqwHOwbnts:phmPJqJwoec:ob-oZqxtUus:sNsSnwg2loE:_EjtpIBQ-_s:_EjtpIBQ-_s:dEeYr_GGAdw:dEeYr_GGAdw:vtKiOZthsos:msAitFgarpc:msAitFgarpc:i22rHpjBHjE:u_melFtiOmQ:u_melFtiOmQ:p1mluujFcvc:p1mluujFcvc:yfmZ4ohlBGI:yfmZ4ohlBGI:GsK_bYcxjyE:roq8cUcw_Hk:yxx3Bkmv3ck:lYHepOyyzm4:lYHepOyyzm4:v0m4ZF2qAQ0:fcQQcpbkvJs:fcQQcpbkvJs:R_wIkowrET4:jtIxpdbdHbE:jtIxpdbdHbE:-wwp_Zi_ezo:-wwp_Zi_ezo:gJbmR3I1iBs:xsgguhFelKs:xsgguhFelKs:hTgxxmRvxyg:OqQOaScdTJw:EyTtBHlxIys:EyTtBHlxIys:zsoOuQStd-k:1ocONrEwhlc:ddzTZBfuaBY:ddzTZBfuaBY:QpQpsGrvlEY:QpQpsGrvlEY:wltEkq1BjTc:sohfOvslPAs:sohfOvslPAs:rhedpNtqsQo:rhedpNtqsQo:BscAT_iQI1A:oSkiN_sdg1Q:wFhqqOE_dKg:wFhqqOE_dKg:w4kygohyojI:Zbkil4kutwI:Zbkil4kutwI:vGP_ABzmk1g:vGP_ABzmk1g:qcuc3rgwZAE:qcuc3rgwZAE:fHJchOtb2_A:fHJchOtb2_A:yWZ4mdOhhuk:h2yicpQqvds:h2yicpQqvds:govSEaEP4HA:qkyPvhapxQs:qkyPvhapxQs:tvmFEPiyJPk:qFHxkZdz4HA:tcbfqfgqigo:tcbfqfgqigo:aQiab_-xtKg:aQiab_-xtKg:oBRt3ZAadBY:swATo0S6PS0:qQkb-BmSsQg:qQkb-BmSsQg:s3ihrKGvyrE:sPiFysaglcs:sPiFysaglcs:lkbftbfHdKg:rSob4c-1hEw:dB4Jmyaooes:sOBAdKipu4c:aiAbwmzbGyA:aiAbwmzbGyA:eiA3byGTejA:eiA3byGTejA:ieOSRiRdG_c:ieOSRiRdG_c:bfevcsANSr4:bfevcsANSr4:zAP5dlvzqo0:muvcqunRN6E:uGtwBZ1vq2w:uGtwBZ1vq2w:sigIJw_-Aac:sigIJw_-Aac:kt3b-FvOTxo:kwFkkrRHrQo:xR2ZmPqG_-s:xR2ZmPqG_-s:kcgaKASuBqc:kcgaKASuBqc:ymi-oFkx_rQ:BROKEN_____:BROKEN_____:oAopav-lHxE:oAopav-lHxE:G1wgGRcmxIE:nb_qho0heJU:zEwSPecezJY:EvfqdqPloBQ:EvfqdqPloBQ:laQRlb4bnhs:laQRlb4bnhs:jQApnbths3o:_EzZiv-jt4Y:_aR_qwbBOxw:_aR_qwbBOxw:ySzxfuHqilw:ySzxfuHqilw:tFtZ1jJqFfw:ScsfxTgGkHQ:tlS-SF_ctOQ:tlS-SF_ctOQ:OnsnZTYoe-c:OnsnZTYoe-c:vvw-8fnecwQ:pxO3p-bJivo:pxO3p-bJivo:OKpwPljtEAE:zoiwSs1inZE:zoiwSs1inZE:zAv3xfg_sfA:zAv3xfg_sfA:lvZABH3nuoc:v-omnt_qPfk:lPq_btcQiOE:lPq_btcQiOE:wZ3oGTHUesA:e_cuRyq-mlc:e_cuRyq-mlc:EQQcOKfHpsQ:EQQcOKfHpsQ:ssHdFvOaz7A:m-aayo7wgpo:piFAQ4iPwgE:yvf-AhkpyEo:yvf-AhkpyEo:zAqmGcH-izA:zAqmGcH-izA:qipkv3siQlo:qipkv3siQlo:GjbqybEAYfc:ovjcpbIGjBA:ovjcpbIGjBA:f4IZBffdGQk:dvY1jiftQFA:spsE1To_wjs:spsE1To_wjs:ev2obEw4IHk:wJxxZP-EjbE:PEhbRdQ-QyE:PEhbRdQ-QyE:lcmcgOvvER4:jIsq_fugwsE:jIsq_fugwsE:FkaFcvAyvmg:FkaFcvAyvmg:eZJgTYylglE:vwYoYtEBAlE:cwaZTg4hIoA:iA4Khfro_Kw:sAIjBAZoghA:wgixEn3EtNE:wgixEn3EtNE:ozbem_kh4-A:rqQApxshzYE:ORxdRFssc-o:_TfHy_aEpmY:_TfHy_aEpmY:Ppqfczkfqlg:eadoBji_JEE:eadoBji_JEE:cmfpdAhBYaA:_lPHPHAxlto:_lPHPHAxlto:m_d3BsoaQhE:b1fRZh2GiSc:lybsZGEotRw:lybsZGEotRw:dNcqAeEgohw:dNcqAeEgohw:ydiGAdjtvgs:ydiGAdjtvgs:sHJiOZTvOcc:sHJiOZTvOcc:y-FqyZjpSyA:y-FqyZjpSyA:mtysglpb-BI:mtysglpb-BI:wmu-nzbHH-Q:_iQR_YlsxdE:_iQR_YlsxdE:EbAwbFbrueY:fpEedKmOxxE:fpEedKmOxxE:HuF-uozGz_A:yuBARdwxxow:yuBARdwxxow:d-sbT_zwQSE:vABphmpqOQs:vABphmpqOQs:dRdrTOBohso:BqpsycrqTwA:pRWPR0JdyFE:HnsuuTqGPew:QqwdNwwQPqQ:gHEKsekTyKo:gHEKsekTyKo:rgAgqry-cok:rgAgqry-cok:pyaF-jSZeiQ:mKj-t2JoBJc:whmqtpFfpdw:whmqtpFfpdw:oEbTS4lzQOQ:oEbTS4lzQOQ:fdHmRkHS_io:xiB1eejdgdQ:TdetZOGwwQE:lHiuGOHpmno:lHiuGOHpmno:upkfmifpZ4I:upkfmifpZ4I:bsQmoj2m2Yk:dFpqSnv_avw:dFpqSnv_avw:cGqEBvlmFAQ:cGqEBvlmFAQ:miwdmscuFfE:miwdmscuFfE:lcozsZuvatQ:ze-yx_Zgpec:ze-yx_Zgpec:mdwv-PzyeqE:mdwv-PzyeqE:vknsNgdKpdA:fxieKFowcjE:fxieKFowcjE:nOQNAzvZQnA:yasAwfAkcBg:yasAwfAkcBg:qYupippGfGc:qYupippGfGc:-tB_adyqijA:bgAwgI1HZac:ukTHyklqyiE:ukTHyklqyiE:lmmh4lkvrTo:AntcEmvgqeY:AntcEmvgqeY:mivaYecxmzA:mivaYecxmzA:gfITTrl2b1w:cclcJoqpaSQ:cclcJoqpaSQ:ycelvHNQSwc:ycelvHNQSwc:v12tbjdoHIQ:_kawt2AFceQ:vfa_2iRcTKs:apsFhzbOatA:apsFhzbOatA:wmJxKjiodxk:gyp2q2G_GkQ:zeoovSB1dqk:zeoovSB1dqk:gQifzqaTTZg:zQgyou_zIQs:zQgyou_zIQs:jJBa-Jyxlzg:kgtuHlpn_IE:qPZhwyvA4Oc:qPZhwyvA4Oc:oJjNvxhmj1s:avuHvnsRQrs:t3_uK-HElhk:cOmgslHwgpc:cOmgslHwgpc:PHwast_nGsY:OSod_P_thiA:1Aam-YszHxs:RbcbpqFA_cQ:RbcbpqFA_cQ:To1plZGqg2c:BPZ4f-dKm_s:v3PHeGEvbvQ:v3PHeGEvbvQ:rhP4mj_xScw:SzGOyHbi-jw:N-nIQQuAhu4:N-nIQQuAhu4:hqaYlNBcpAw:hqaYlNBcpAw:jqQ1ltgp-tI:hlZhxpdxmPw:hlZhxpdxmPw:zSt2I-ekZ-E:bt-Ysloklak:bt-Ysloklak:bHqiYQqclHk:bHqiYQqclHk:tigocuoyJx4:gdOpyudgjmw:qpudqbOdKSQ:qpudqbOdKSQ:x__qGOHP-1A:x__qGOHP-1A:s1iZ1-e1SfA:dkoqvlGuzvQ:SyFxF4Nryfo:SyFxF4Nryfo:yxx3FhyzbFY:yxx3FhyzbFY:aiBRpdb1HxY:ipzshwvHcns:ipzshwvHcns:leTjElxNQEY:leTjElxNQEY:1bKHmmyfSwQ:fI_AQntrgic:n-dQdPeid_Q:n-dQdPeid_Q:TypFkTfl_ww:TypFkTfl_ww:TIif3wgdeaE:TIif3wgdeaE:RQ3odzdbB-A:v1x2_KHNTwA:v1x2_KHNTwA:knNvkGHbkQY:rJaqTGR3ARY:rJaqTGR3ARY:Zv-Y4cqvEhE:ugcozgEZv_g:ugcozgEZv_g:uvtoGPEAdsw:uvtoGPEAdsw:eyA4xxyydEo:eyA4xxyydEo:s2qrnT60Avg:y-OGGubZd1Q:OiHpu-mdcrQ:OiHpu-mdcrQ:q1uTYkOlGvE:GQRu_ltP-uc:GQRu_ltP-uc:ANeexOuTnAQ:ANeexOuTnAQ:w4qEBBRBmOc:w4qEBBRBmOc:w_rhiQaGKbQ:w_rhiQaGKbQ:lY-llZ2OAbE:lY-llZ2OAbE:azuQtpF-AnQ:bHaAeSnO_HE:bHaAeSnO_HE:geRymtZtmOo:geRymtZtmOo:wSGuy3-uGGo:BpetlIualbk:deqfqFgGKkE:unHlaSxOHwg:unHlaSxOHwg:xYq4vZsy_ps:xYq4vZsy_ps:vKTulaBSkJ4:vKTulaBSkJ4:vzk4xFyFfTE:vzk4xFyFfTE:PsSFiv-yobw:PsSFiv-yobw:tnAztNll2-A:yhPRkihs-Yg:yhPRkihs-Yg:uHtRju2EcsQ:uHtRju2EcsQ:o2bwsqvkKao:axi2khkpnHI:vovohmoiSSw:vovohmoiSSw:NlN-_yB1kac:-eb-fTTSiA4:wSTyK-b-tuo:wSTyK-b-tuo:rsixtgYdzeE:rsixtgYdzeE:3TtaBEabN_s:3TtaBEabN_s:FswnzwvOo1w:GF4HTGEpnlQ:OG2ZZbcxxTE:OG2ZZbcxxTE:vpcvxqrarF0:OTrYiQc3qjo:OTrYiQc3qjo:QObQcP_QlKQ:QObQcP_QlKQ:sJhsmqFQejg:sJhsmqFQejg:BROKEN_____:oPGOawtaNNk:z0FjBPzYdpc:FnRS4dtyaoA:vaGmqdNcteE:vaGmqdNcteE:wPwqTSxhzr4:QijnwafQxeA:kHEgqFihe_o:kHEgqFihe_o:rQcav-3UblQ:fskFoqloxKk:fskFoqloxKk:xQlBew-mRdk:xQlBew-mRdk:rwbhtdKTEeE:AHuhzhtZT3E:iHyqvFgPRzA:txcxtmHvx1s:y1Ek-yBSlAw:y1Ek-yBSlAw:SxAHRwt-tAk:SxAHRwt-tAk:y0gFJaSBQEI:PqzlpzP-hvw:_spoyklAkgg:_spoyklAkgg:wdhtpZ2JZew:wdhtpZ2JZew:E2xBw2rrjro:E2xBw2rrjro:xxAQwd5bWlg:ZAqwFZFv4sc:xiKYv1rhqGg:ggsqvFsgoKk:ggsqvFsgoKk:aYAHGKtQqcQ:HbstbqnpwfI:HbstbqnpwfI:ujRImvE-Ou8:ujRImvE-Ou8:BcAZA2YREdg:BcAZA2YREdg:zUidhf6svZQ:Jt3xtStOnso:Jt3xtStOnso:mSjvsS-HdwA:mSjvsS-HdwA:_ciSdcldorQ:_ciSdcldorQ:1NlxBbBN-mE:QKHFbeQmHQQ:QKHFbeQmHQQ:ikctfKEwZZw:tOpEJR0_Ho0:mGsafpPhe2k:cynqY_iFBwA:cynqY_iFBwA:uQ3bbgbmkrI:uQ3bbgbmkrI:aypEx5gvOrE:ZcZfxuhqfqo:ZcZfxuhqfqo:cAN-aQHElEE:tdzetylTHFE:tdzetylTHFE:ebf2Gg2bsmw:v_asAv8u-vE:agASFFHpZsw:mxmKuTqp_dg:mxmKuTqp_dg:xIyt6smw1vE:TzZSsyw3pPc:BROKEN_____:tjwzSAOm_lE:tjwzSAOm_lE:iBHE-l2NOKw:_bKgeqmmqNc:_bKgeqmmqNc:gifrBZb_1tY:Pltaqfkpi-o:Pltaqfkpi-o:hdeuzHdtZAY:hdeuzHdtZAY:vSQrriirSNw:vSQrriirSNw:jqHFfe4Zj1A:dkhbdRhtaoo:sptjBekF-mg:sptjBekF-mg:hzekdsxBs2A:GsmtrGG4_bw:wpfneYne41E:tkTTgoHhkbQ:tkTTgoHhkbQ:slmbfx4Sodg:tOJ_BdGsekc:sQjwvJuhOPE:sQjwvJuhOPE:xo4KGRldu-o:xo4KGRldu-o:oxmpUQ5AqNA:yBE8dmhtNdw:x-jEObj1EOA:x-jEObj1EOA:usFszlBw_GE:usFszlBw_GE:tpeqpfAowYY:oixhtoEYBQY:dz-3plw5dbU:dz-3plw5dbU:mhh4bAjryGc:gQAeuqq_ydE:gQAeuqq_ydE:SaJbbfvviQY:GwhKpaqOHxc:GwhKpaqOHxc:eHKoSEg_Qqc:eHKoSEg_Qqc:ocbx1cmOrOQ:ouQ121eGhos:ouQ121eGhos:-eenfpvEIHE:-eenfpvEIHE:q-rhmug3zyw:q-rhmug3zyw:_indnHwaTko:_indnHwaTko:BerRrzmeyic:BerRrzmeyic:rgOfiabA-gE:rgOfiabA-gE:vJorcluiylg:xphr-1B2iao:xphr-1B2iao:JugwkGHpkbY:JugwkGHpkbY:IbbtzGz2nuc:tHt-tEB-hdY:tHt-tEB-hdY:nJ4w1yaxTcc:nJ4w1yaxTcc:qoqmwz-Pkwk:qoqmwz-Pkwk:kuOhihQcASs:kuOhihQcASs:lmheIgzq2kk:ydxufx7yxNA:Ha-TFa-wxZw:Ha-TFa-wxZw:ycsFelfskpw:ycsFelfskpw:wcPzTr-BbAA:uawjxcKHkJY:oZeptvEaQwg:oZeptvEaQwg:pipoQkmbEPw:pipoQkmbEPw:sGftP2f-nqo:sGftP2f-nqo:stQSmj5xHPk:stQSmj5xHPk:wA4abGiOigE:RSplw-dOuas:RSplw-dOuas:xzSEjPm_J4Q:woxrN2rrc6Q:3-fNPvlwkKo:KvAoGq21Ksc:KvAoGq21Ksc:QgEROTolbQA:QgEROTolbQA:pqY-rBBytAo:pqY-rBBytAo:jE2txaRhfrs:jE2txaRhfrs:zf-sRhp3wtw:xi-fdglSKwk:xi-fdglSKwk:phA_mGxR4-A:-PhHceAvzJQ:lNqqlaucRso:lNqqlaucRso:YlTr3wglbpk:wOwqd3PlEiA:gdli-TTBElA:gdli-TTBElA:lAaoYTBzFGs:lAaoYTBzFGs:zvbtc31oEnQ:zvbtc31oEnQ:ydP_bOGskbw:ydP_bOGskbw:nboTFkNFqGA:_rSFP_rlS_A:_rSFP_rlS_A:yxoZNb3wHPw:yxoZNb3wHPw:tFnp_0lwo2k:vF5_g0NShYg:wldg-SSIw7s:jQAEOaARj3s:dSBsjQJvwcs:pntwvOdBeno:pntwvOdBeno:axKH2_wwqjA:-piTrbowbYs:-piTrbowbYs:qPvhIyG5EAQ:ikdG0QTlPR0:gnERtvheF2w:s3cBOlHBEAE:s3cBOlHBEAE:t_iJQbFbe7o:GaAiOelrQwA:GaAiOelrQwA:qPgmRcBZyqc:qPgmRcBZyqc:vH3YBFshA1A:vH3YBFshA1A:ozBmSa2lBeo:fRpfuTQAyhI:fRpfuTQAyhI:mAd3etGsySQ:GNa_gaq-2FQ:f2zjujSEPFE:yfmRxiPynNQ:yfmRxiPynNQ:lFng3sdevyo:lFng3sdevyo:Zd-xwwyiuYc:Zd-xwwyiuYc:zqblBq-fUJc:zqblBq-fUJc:w0OPewyNePA:ScvbulGKgdQ:siOxNGAx_TQ:siOxNGAx_TQ:fPja-_dOPPg:ABBp-ikv_GQ:vBxO0mncNQA:fQlPJmHZeYA:fQlPJmHZeYA:Evf3uJNxSTA:bc1kYKAfwhg:bc1kYKAfwhg:yhqKiH4b3hE:targHvzwy5I:hBwFOrndQ2Q:hBwFOrndQ2Q:dNzvA-7ZNws:huH-PzYKOaA:IH2mx1edoEk:waOkpHJc2Pg:waOkpHJc2Pg:K_autmceJFo:yNN-SsfbB4A:yNN-SsfbB4A:FsuvimkuckQ:FsuvimkuckQ:llTOyPxaeoo:llTOyPxaeoo:nhE0ymwciHg:t4Fp2pQwgNg:J_jQtQyPJOE:J_jQtQyPJOE:r_uBHmAhnfo:r_uBHmAhnfo:eiretQENyr4:eiretQENyr4:aefvthRIt7A:aefvthRIt7A:OwbTq_4-jGg:vspaa1GAzbc:vspaa1GAzbc:PjpyfyETHaE:PjpyfyETHaE:xRKgGw0Yf7w:O-1gxufhyio:O-1gxufhyio:xId34mpqxBc:oKq3lhGwzdY:oKq3lhGwzdY:HaenjNBfphc:-xZpxtgg_JI:woQHJO-HQio:woQHJO-HQio:TSyHqgSq_ag:TSyHqgSq_ag:y5NtZN_pbcQ:OfQQvjSHmbg:OfQQvjSHmbg:yFp_BN4mkbY:_NYcqEqyOpk:_qolnm2dA-Y:_qolnm2dA-Y:tutZSvauyhE:tutZSvauyhE:ghgBTOvJhwE:_awtaymTJBQ:_awtaymTJBQ:13TTFhcRwmQ:ttqEsg7qf_w:sak-taOOyYg:sak-taOOyYg:qZwzwmTdedY:qJHtyjTgHYA:qJHtyjTgHYA:AyeeJYx_wHc:AyeeJYx_wHc:-vGlrcayloE:-vGlrcayloE:hvRQyR1Nric:hvRQyR1Nric:whvHz4azNOA:whvHz4azNOA:TdJA3dtmh-A:YRld_AKievg:-ndwmvIwQmo:-ndwmvIwQmo:j0wSohites0:zmPbzgu_Gn4:zmPbzgu_Gn4:pHv3phv3yNA:wpT3w2QWbkw:rqbc4nTivlg:rqbc4nTivlg:mbFkqanETTk:mbFkqanETTk:ctaaN1dJccI:qx_vmZbh8Bg:_kxwbilQIyA:_kxwbilQIyA:xbH1owYAz7A:BmNbZygqHpE:BmNbZygqHpE:v4T2xWgRZGw:lfd_gtrdgGg:lfd_gtrdgGg:1n-to3ahKtA:vaHOFd-KStk:vaHOFd-KStk:xm_-EYgQvlc:xm_-EYgQvlc:rr3bYslx-ec:IqZlim_yoww:IqZlim_yoww:luA4GtJxE20:srScJAs2i1c:srScJAs2i1c:yTg1EPJa1_s:yTg1EPJa1_s:spvbAObyqwo:spvbAObyqwo:mf2keggHpyc:kuAviEmmoP4:kuAviEmmoP4:-sdJ2JdtlGY:zmaRs5Q3gOw:AaGezzEkEag:aFuiJhcff3Q:ozqlcZqtgrg:grefAhSvcvc:grefAhSvcvc:qSeotyOZEZA:qSeotyOZEZA:zfhna4Wuxdc:-scOr4rmGNc:-scOr4rmGNc:qZb_rxOlRs4:qZb_rxOlRs4:ewdeEGoaANI:ewdeEGoaANI:tcl2oe1-pxI:tcl2oe1-pxI:v_QqpeRbc_k:v_QqpeRbc_k:mai_uYRTgxQ:mai_uYRTgxQ:oJ-Be8vJPbA:Rxgf2s-QJYA:Rxgf2s-QJYA:FG1QnwBBP2E:Qhoq_-Hl4gY:Qhoq_-Hl4gY:xHiBtaBuhI4:y8jcgyBpnPo:svb1JvgxAOw:svb1JvgxAOw:vlsSQwsjvEk:vlsSQwsjvEk:KhlBziyisdg:BOoG1FoqynA:BOoG1FoqynA:fOqO2yiqnsc:zQxixvjQBOY:zQxixvjQBOY:lAbStfySPlc:lAbStfySPlc:Q-BcAB3JeGk:xfvGpm-ERQU:wA1K5oRdsvk:pxImOyJq1x4:tArFzilwatw:tArFzilwatw:gycjSHbdwSc:tcpplFkwSok:tcpplFkwSok:kpo_hmKhB3g:wOvY-lq4TBE:wOvY-lq4TBE:wxkYqltzm_A:ckGupKeisQw:ckGupKeisQw:ANeyxntEQxQ:ANeyxntEQxQ:tHmlEylrO1E:xxabxIt2oow:xxabxIt2oow:fl4txxhlpFE:xiuEx5pQkRc:aBmvxiP-PNw:dlmpmtHnnEI:dlmpmtHnnEI:Hh3BAyAjxkw:GwinnRsBQR4:GwinnRsBQR4:ooj4cOBSHaQ:uuwsyqp-wwk:uuwsyqp-wwk:pAkjkG-E4dE:sssqc1Qoknc:Km-us_xvamY:Km-us_xvamY:aAwkEgIQvyo:aAwkEgIQvyo:mdNsjoQ-iO4:FKuObKhqQrA:FKuObKhqQrA:tPAjY_lZzYo:ElanOZfZGsQ:ElanOZfZGsQ:pHiK4sAzeKc:pHiK4sAzeKc:v4wohAa-dPg:v4wohAa-dPg:KKawRlBeftE:kamyxB-yKrc:kamyxB-yKrc:bpnwRGpbhno:bpnwRGpbhno:j_E1_j0dHqk:ZPImchaxn2Q:-jyEahOy4Tg:HyHGATyynmI:HyHGATyynmI:xPA5juzIEZs:aHOmfbngyBs:aHOmfbngyBs:G3E1AjGw_Pc:G3E1AjGw_Pc:FEclp1gba1E:FEclp1gba1E:-1eKoQGjjhE:sugfhgIkwac:sugfhgIkwac:nxOjtihOl-s:ccNbsxeetdc:jqvFxJEJbtg:jqvFxJEJbtg:wbR4fJ_e_vw:QdGBr3yzagg:aJpljm-mziY:aJpljm-mziY:wHv_af-ScFw:xzBGEAdG-Tg:xzBGEAdG-Tg:rztcb-sbEE4:nilQjgsEGN4:qBOHvRQ3orE:qBOHvRQ3orE:uKnoo-s1c2I:wQWygif5dck:wQWygif5dck:iQA0sfA3ZEc:I1sfslgQ_mw:I1sfslgQ_mw:IwJbb0tQq7s:wune-PzwoQg:wune-PzwoQg:jOdkbOPiqsE:4jgoAfPWFzo:wrNAF5pbFNc:wrNAF5pbFNc:eEoSwgeBqhY:eEoSwgeBqhY:IqwzZwTyeyo:wfnEO1E2hsU:FokvtHumQag:FokvtHumQag:cSZFdJfT-so:cSZFdJfT-so:uQRS-Jqp0oA:pkbkTTtmhhw:pkbkTTtmhhw:u_HcNlmOSwg:u_HcNlmOSwg:draqd3ETFPE:SRjg_Aaq3bg:FzbQh-d4Tto:vqkcyp_tI-A:vqkcyp_tI-A:OwJngGTwn2o:p4qEHZlzHog:p4qEHZlzHog:ngOaItfq-6k:Ee-QEJndBJE:Ee-QEJndBJE:wZohsGGmtEk:wZohsGGmtEk:G3GEJpvkEmc:wcTxGTwceJo:wcTxGTwceJo:qbSJzHQYols:k4pZg-Q_PHc:f1hqHvR3FdE:xrbuhOuTKFk:xrbuhOuTKFk:lrpmEejhTAw:HkthxdutBnA:um3_QAQcwP4:laaQdZbsGZE:laaQdZbsGZE:glZYGy2ouSE:glZYGy2ouSE:yEi3aKJdeO0:yEi3aKJdeO0:pbsnuJq1Wq4:pbsnuJq1Wq4:YshJBTypvEA:beKfByBlAhQ:beKfByBlAhQ:hfhY_BwB7fs:QihseRRApI4:QihseRRApI4:y8nhcmwyoqQ:q3dqiRpGgGs:q3dqiRpGgGs:j1tbcogawSQ:yq0pt_Y_frk:zGgwahbqahU:zGgwahbqahU:ggRPnFuu-Qs:ggRPnFuu-Qs:_QhqbbmP4uc:_QhqbbmP4uc:ngf2GoEFJPE:ngf2GoEFJPE:uG_tQKQbjAY:uG_tQKQbjAY:wHJmcFvEnTA:NTocsiSFfys:NTocsiSFfys:-J_ihyPlOxw:rexKPqsy5vQ:JmhZfYJSuqs:ncmiFPhxiro:mauh_YQKhgE:mauh_YQKhgE:pj-B-SbpJiA:pj-B-SbpJiA:QyaGi1wYQgc:QyaGi1wYQgc:Nihjfvmx_so:_jaqSimTYjk:uJTG2OQOl-w:uJTG2OQOl-w:nvu_IgvoGE4:xfp_n5Tyryw:lTPPipSAenw:lTPPipSAenw:rrNat-3H-Ew:rrNat-3H-Ew:hTj2SGPkKtg:kx_larKYpAQ:kx_larKYpAQ:slauSOa5-Qw:2v-_TGTklFQ:2v-_TGTklFQ:hnTGzYgumaI:tchOzeivZo0:lPlR-_ocdTQ:wAxyheoixmc:wAxyheoixmc:wPp7jbuJOHo:wKq2kbqtf3A:HFtTSPjpj_c:HFtTSPjpj_c:wFvzs2P1hHQ:wFvzs2P1hHQ:ZebJ2PE1ztg:T_BtuitQh_w:T_BtuitQh_w:ry4Kkuxx4F0:YduEfbzpdOQ:YduEfbzpdOQ:dqdRKFgoPfc:dqdRKFgoPfc:bHmAqtibTiI:ouYqANH8hlA:y7UZHEHhdek:RopkEy-EycA:RopkEy-EycA:qBw1hEEqZS0:xmg5axAQiyw:xmg5axAQiyw:plUsAQuaBZ0:plUsAQuaBZ0:hcB-w_3FHxQ:hcB-w_3FHxQ:Bs1HxF2zuzk:bnNI-cdxirQ:ppAPdFagHzE:ppAPdFagHzE:aZgdFncg1ss:wfNJmNGcsEQ:wfNJmNGcsEQ:lucajYNfFc8:B6AQhpFkgfQ:q4tGzHNuONQ:q4tGzHNuONQ:sKrdk4xwdBo:sKrdk4xwdBo:fx1do3YRPsE:fx1do3YRPsE:eFnlOA8-jdA:OtA4AEl_KJk:OtA4AEl_KJk:u1AjQxdb3Hc:u1AjQxdb3Hc:dQKotAHphKE:dQKotAHphKE:fQQJr-tEaJE:ln0ff5dZe0c:wx3wr2ZrSYA:wx3wr2ZrSYA:vQRiJthf6a0:yw7AfY0fihA:yw7AfY0fihA:xj3b3_Gpius:wiGjv-aOlhE:wiGjv-aOlhE:IAfz1PcxAyo:bdAxwEApy_Q:bdAxwEApy_Q:yuoq_YeIBxc:rTaE_HS_2ik:NP-bZmvOzhA:NP-bZmvOzhA:PBqjFihluag:PBqjFihluag:zNdQy3yyBgQ:ougEbiPYG2c:yn2bGA-nZAA:yn2bGA-nZAA:qqsZ_J3fm-A:Zf0lOv_ZIn4:ZAgZv10jIbo:gOqe2olOSuc:gOqe2olOSuc:ciZ0v8rGabo:ciZ0v8rGabo:xgwc4fsipJs:xgwc4fsipJs:k3Odpd3EFAE:FS6cFHTI1uk:FS6cFHTI1uk:zOh06yNeboc:zOh06yNeboc:O-RRxsorbPg:ladYOoihTHk:ladYOoihTHk:IBElwAz3O5s:kS2sGozZxZc:PpzFEyFxtoo:PpzFEyFxtoo:rxTt2yY31cs:wZmc7Egwfpc:wZmc7Egwfpc:YhBwhuqFqjw:YhBwhuqFqjw:hRp2iaks_fg:peGgwq7uJ_U:idhgcpHBvuo:idhgcpHBvuo:dfYKdPPxG_o:NNmy-vuwxrc:NNmy-vuwxrc:OEo_ug8EQbU:SfkphhQtEys:SfkphhQtEys:vwrTyHPe2QE:geFJKtFisPA:geFJKtFisPA:zowrvPh6xcs:ukbiPBR2-GI:hW-ynfpmcj4:hW-ynfpmcj4:HArS1HmjruQ:HArS1HmjruQ:ediic2HnGco:ediic2HnGco:qQiwgEQNfQs:qQiwgEQNfQs:GGGrmu_cYto:yZiWeGlNHug:GZFuHnwGZNc:GZFuHnwGZNc:swiSjPF_ii4:yn_lOfckS4o:yn_lOfckS4o:snNs6Weqtzw:IlppNGAeafE:nn_OOeNcPnw:nn_OOeNcPnw:4dK-BcpcnGw:a3FJiyeRrew:a3FJiyeRrew:H4_TtauZHaw:4kT-Ggvygc0:nGEO_aozx8w:nGEO_aozx8w:vgmYHte2Grs:vgmYHte2Grs:PsyZzsKcvic:PsyZzsKcvic:AiOzg_qNuT4:AiOzg_qNuT4:oOBPSkdqZZo:oOBPSkdqZZo:HO_uATipTtg:iA_liuSEKwk:iA_liuSEKwk:AbBF-faYffc:vzZH-OoHuyo:vzZH-OoHuyo:mir7GitnpuE:swcjch2KKIo:swcjch2KKIo:f-2EezHkGOs:f-2EezHkGOs:hPGtjxFKc50:quk0P8dl_OY:hNmFAeHOeBE:hNmFAeHOeBE:mvlwbkW-p0A:jsEhj-cjrPE:jsEhj-cjrPE:qtaQjlsquwc:qtaQjlsquwc";
    a = a.split(":");
    return "youtu.be/" + a[min * 60 + sec + (state.youtubeDiff ?? 0) - 180];
}
function sacrifice(password) {
    // FIXME you need to remember this
    let letters = [...document.querySelectorAll("button.letter")];
    let wegdamit = document.querySelector(".sacrafice-btn");
    let used = [
        ...new Set([...password.toUpperCase().replace(/[^A-Z]*/g, "")]),
    ];
    let kick = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        .split("")
        .filter((x) => !used.includes(x))
        .slice(-2);
    setTimeout(() => {
        let index = kick[0].charCodeAt(0) - "A".charCodeAt(0);
        letters[index].click();
    }, 4);
    setTimeout(() => {
        let index = kick[1].charCodeAt(0) - "A".charCodeAt(0);
        letters[index].click();
    }, 6);
    setTimeout(() => wegdamit.click(), 8);
    return "";
}
function hexColor() {
    let col = document.querySelector(".rand-color");
    let bg = col.style.background; // 'rgb(11, 218, 5)'
    let rgb =
        "#" +
        bg
            .replace(/[^0-9,]/g, "")
            .split(",")
            .map(Number)
            .map((x) => x.toString(16).padStart(2, 0))
            .join("");
    let sum = [...rgb]
        .filter((x) => /[1-9]/.test(x))
        .map(Number)
        .reduce((sum, x) => sum, 0);
    if (sum > 5 || !rgb.match(/[a-f]0[a-f]/)) {
        document.querySelector(".refresh").click();
        state.update();
    }
    return rgb;
}
function fill(password) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    const charCount = Array.from(segmenter.segment(password)).length;
    const hexagrams =
        "䷀䷁䷂䷃䷄䷅䷆䷇䷈䷉䷊䷋䷌䷍䷎䷏䷐䷑䷒䷓䷔䷕䷖䷗䷘䷙䷚䷛䷜䷝䷞䷟䷠䷡䷢䷣䷤䷥䷦䷧䷨䷩䷪䷫䷬䷭䷮䷯䷰䷱䷲䷳䷴䷵䷶䷷䷸䷹䷺䷻䷼䷽䷾䷿";
    return hexagrams.slice(0, 101 - charCount);
}
function format(password) {
    const letters = Array.from(password);
    const sizes = [0, 1, 4, 9, 12, 16, 25, 28, 32, 36, 42, 49, 64, 81];
    const letterindex = {};
    let formated = "";
    letters.forEach((letter, index) => {
        let style = "";
        if (letter.match(/[aeiouy]/i)) {
            style += "font-weight: bold;";
        } else if (state.level >= 30 && letter.match(/[0-9]/)) {
            style += `font-size: ${Number(letter) ** 2}px;`;
        }
        if (state.level >= 28 && letter.match(/[XVI]/i)) {
            style += "font-family: Times New Roman;";
        } else if (state.level >= 27 && letter.match(/[a-zA-Z]/)) {
            style += "font-family: Wingdings;";
        }
        if (state.level >= 31 && !letter.match(/[0-9]/)) {
            let x = letter.toLowerCase();
            if (letterindex[x]) {
                letterindex[x]++;
            } else {
                letterindex[x] = 1;
            }
            style += `font-size: ${sizes[letterindex[x]]}px;`;
        }
        if (state.level >= 26 && letter.match(/[a-z]/i)) {
            style += "font-style: italic;";
        }
        formated += `<span style="${style}">${letter}</span>`;
    });
    return formated;
}
function final() {
    if (state.level == 36) {
        document.querySelector(".final-password").firstChild.click();
        state.stop = true;
        setTimeout(() => {
            [...document.querySelectorAll(".ProseMirror")][1].innerHTML =
                state.lastPassword;
        }, 20);
    }
    return "";
}
// helpers
async function fetchChess() {
    if (state.fetchingChess || !window?.Chess) return;
    state.fetchingChess = true;
    const chessElement = document.querySelector(".chess-img");
    const color = document
        .querySelector(".move")
        ?.innerHTML.trim()[0]
        .toLowerCase();
    let response = await fetch(chessElement.src);
    const svg = await response.text();
    state.fen =
        svg
            .split(/<\/?pre>/)[1]
            .trim()
            .replace(/ /g, "")
            .replace(/\.+/g, (x) => x.length)
            .replace(/\n/g, "/") +
        " " +
        color +
        (color == "w" ? " - - 1 0" : " - - 0 1");
    const url = `https://lichess.org/api/cloud-eval?fen=${encodeURIComponent(
        state.fen
    )}`;
    try {
        response = await fetch(url);
        const data = await response.json();
        bestMove = data.pvs[0].moves;
        const engine = new Chess(fen);
        const move = engine.move({
            from: bestMove.slice(0, 2),
            to: bestMove.slice(2, 4),
        });
        state.chess = move.san;
        state.fetchingChess = false;
    } catch (e) {
        let db = chessDB();
        let pos = state.fen.split(" ")[0];
        let res = db.filter(({ fen }) => fen.startsWith(pos));
        if (res.length == 1) {
            state.chess = res[0].sol;
            state.fetchingChess = false;
        }
    } finally {
    }
}
function debounce(func, delay = 1000) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
function hhmm() {
    // original code from neal.fun
    const time = new Date()
        .toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: !0,
        })
        .split(" ")[0];
    return time;
}
// backup only if lichess fails
function chessDB() {
    return (B = [
        {
            sol: "Nf6+",
            fen: "r2qkb1r/pp2nppp/3p4/2pNN1B1/2BnP3/3P4/PPP2PPP/R2bK2R w KQkq - 1 0",
        },
        {
            sol: "Qd5+",
            fen: "1rb4r/pkPp3p/1b1P3n/1Q6/N3Pp2/8/P1P3PP/7K w - - 1 0",
        },
        {
            sol: "Qb8+",
            fen: "4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 1 0",
        },
        {
            sol: "Qd8+",
            fen: "r1b2k1r/ppp1bppp/8/1B1Q4/5q2/2P5/PPP2PPP/R3R1K1 w - - 1 0",
        },
        {
            sol: "Qxg6+",
            fen: "5rkr/pp2Rp2/1b1p1Pb1/3P2Q1/2n3P1/2p5/P4P2/4R1K1 w - - 1 0",
        },
        {
            sol: "Qxd7+",
            fen: "1r1kr3/Nbppn1pp/1b6/8/6Q1/3B1P2/Pq3P1P/3RR1K1 w - - 1 0",
        },
        {
            sol: "Qxf8+",
            fen: "5rk1/1p1q2bp/p2pN1p1/2pP2Bn/2P3P1/1P6/P4QKP/5R2 w - - 1 0",
        },
        {
            sol: "Qd7+",
            fen: "r1nk3r/2b2ppp/p3b3/3NN3/Q2P3q/B2B4/P4PPP/4R1K1 w - - 1 0",
        },
        {
            sol: "Qg6+",
            fen: "r4br1/3b1kpp/1q1P4/1pp1RP1N/p7/6Q1/PPB3PP/2KR4 w - - 1 0",
        },
        {
            sol: "Qxh6+",
            fen: "r1b2k1r/ppppq3/5N1p/4P2Q/4PP2/1B6/PP5P/n2K2R1 w - - 1 0",
        },
        {
            sol: "Qg4+",
            fen: "r2q1b1r/1pN1n1pp/p1n3k1/4Pb2/2BP4/8/PPP3PP/R1BQ1RK1 w - - 1 0",
        },
        {
            sol: "Qxh6+",
            fen: "3q2r1/4n2k/p1p1rBpp/PpPpPp2/1P3P1Q/2P3R1/7P/1R5K w - - 1 0",
        },
        {
            sol: "Qg6+",
            fen: "r2qk2r/pb4pp/1n2Pb2/2B2Q2/p1p5/2P5/2B2PPP/RN2R1K1 w - - 1 0",
        },
        {
            sol: "Rg1+",
            fen: "6k1/pp4p1/2p5/2bp4/8/P5Pb/1P3rrP/2BRRN1K b - - 0 1",
        },
        {
            sol: "Qxh5+",
            fen: "rnbqkbn1/ppppp3/7r/6pp/3P1p2/3BP1B1/PPP2PPP/RN1QK1NR w - - 1 0",
        },
        {
            sol: "Ne7",
            fen: "r2qrb2/p1pn1Qp1/1p4Nk/4PR2/3n4/7N/P5PP/R6K w - - 1 0",
        },
        {
            sol: "Qc3+",
            fen: "8/2r5/1k5p/1pp4P/8/K2P4/PR2QB2/2q5 b - - 0 1",
        },
        {
            sol: "Qf5+",
            fen: "r1b3nr/ppqk1Bbp/2pp4/4P1B1/3n4/3P4/PPP2QPP/R4RK1 w - - 1 0",
        },
        {
            sol: "Bf6+",
            fen: "3k1r1r/pb3p2/1p4p1/1B2B3/3qn3/6QP/P4RP1/2R3K1 w - - 1 0",
        },
        {
            sol: "Qc8+",
            fen: "rn2kb1r/1pQbpppp/1p6/qp1N4/6n1/8/PPP3PP/2KR2NR w - - 1 0",
        },
        {
            sol: "Re8+",
            fen: "r2k2nr/pp1b1Q1p/2n4b/3N4/3q4/3P4/PPP3PP/4RR1K w - - 1 0",
        },
        {
            sol: "Rc1+",
            fen: "7k/1p4p1/p4b1p/3N3P/2p5/2rb4/PP2r3/K2R2R1 b - - 0 1",
        },
        {
            sol: "Bf4+",
            fen: "r2q2nr/5p1p/p1Bp3b/1p1NkP2/3pP1p1/2PP2P1/PP5P/R1Bb1RK1 w - - 1 0",
        },
        {
            sol: "Ne6+",
            fen: "r2q1k1r/ppp1bB1p/2np4/6N1/3PP1bP/8/PPP5/RNB2RK1 w - - 1 0",
        },
        {
            sol: "Qf8+",
            fen: "6k1/1p1r1pp1/p1r3b1/3pPqB1/2pP4/Q1P4R/P3P2K/6R1 w - - 1 0",
        },
        {
            sol: "Bf5+",
            fen: "r1b3k1/ppp3pp/8/3pB3/1P1P4/3K1P2/PP1n1q1P/R2Q3R b - - 0 1",
        },
        {
            sol: "Qxc6+",
            fen: "2kr1b1r/pp3ppp/2p1b2q/4B3/4Q3/2PB2R1/PPP2PPP/3R2K1 w - - 1 0",
        },
        {
            sol: "Qxb8+",
            fen: "rn2kb1r/pp3ppp/4p1qn/1p4B1/2B5/3P2QP/PPP2PP1/R3K2R w - - 1 0",
        },
        {
            sol: "Qxd6+",
            fen: "rnb2b1r/p3kBp1/3pNn1p/2pQN3/1p2PP2/4B3/Pq5P/4K3 w - - 1 0",
        },
        {
            sol: "Rd8+",
            fen: "r1b1k2r/ppQ1q2n/2p2p2/P3p2p/N3P1pP/1B4P1/1PP2P2/3R1NK1 w - - 1 0",
        },
        {
            sol: "Nd3+",
            fen: "r6k/pp4pp/1b1P4/8/1n4Q1/2N1RP2/PPq3p1/1RB1K3 b - - 0 1",
        },
        {
            sol: "Rxb6+",
            fen: "8/1r5p/kpQ3p1/p3rp2/P6P/8/4bPPK/1R6 w - - 1 0",
        },
        {
            sol: "Qxf7+",
            fen: "r1b2rk1/2p2ppp/p7/1p6/3P3q/1BP3bP/PP3QP1/RNB1R1K1 w - - 1 0",
        },
        {
            sol: "Nf6+",
            fen: "r2qkb1r/2p1nppp/p2p4/np1NN3/4P3/1BP5/PP1P1PPP/R1B1K2R w - - 1 0",
        },
        {
            sol: "Qe7+",
            fen: "rnbkn2r/pppp1Qpp/5b2/3NN3/3Pp3/8/PPP1KP1P/R1B4q w - - 1 0",
        },
        {
            sol: "Rg8+",
            fen: "4rk2/2pQn2p/p4p2/1p2pN1P/4q3/2P3R1/5PPK/8 w - - 1 0",
        },
        {
            sol: "Qxf7+",
            fen: "r1b2rk1/pp3ppp/3p4/3Q1nq1/2B1R3/8/PP3PPP/R5K1 w - - 1 0",
        },
        {
            sol: "Be3+",
            fen: "7r/p3ppk1/3p4/2p1P1Kp/2Pb4/3P1QPq/PP5P/R6R b - - 0 1",
        },
        {
            sol: "Nh4+",
            fen: "rn2kb1r/ppp1pppp/8/8/4q3/3P1N1b/PPP1BPnP/RNBQ1K1R b kq - 0 1",
        },
        {
            sol: "Qxe6+",
            fen: "r1b1kb1r/pp1n1pp1/1qp1p2p/6B1/2PPQ3/3B1N2/P4PPP/R4RK1 w - - 1 0",
        },
        {
            sol: "Qf8+",
            fen: "6k1/5p2/1p5p/p4Np1/5q2/Q6P/PPr5/3R3K w - - 1 0",
        },
        {
            sol: "Qf6+",
            fen: "r3q3/ppp3k1/3p3R/5b2/2PR3Q/2P1PrP1/P7/4K3 w - - 1 0",
        },
        {
            sol: "Nb5+",
            fen: "r3k2r/1Bp2ppp/8/4q1b1/pP1n4/P1KP3P/1BP5/R2Q3R b - - 0 1",
        },
        {
            sol: "Qxh7+",
            fen: "r1bq2rk/pp3pbp/2p1p1pQ/7P/3P4/2PB1N2/PP3PPR/2KR4 w - - 1 0",
        },
        {
            sol: "Qxb7+",
            fen: "k1n3rr/Pp3p2/3q4/3N4/3Pp2p/1Q2P1p1/3B1PP1/R4RK1 w - - 1 0",
        },
        {
            sol: "Qg1+",
            fen: "8/1p3k2/4p1rp/p3Pp1Q/3qnP2/1P6/P6P/2R2R1K b - - 0 1",
        },
        {
            sol: "Bh6+",
            fen: "r1bq3r/ppp1b1kp/2n3p1/3B3Q/3p4/8/PPP2PPP/RNB2RK1 w - - 1 0",
        },
        {
            sol: "Rxf6+",
            fen: "4r3/pbpn2n1/1p1prp1k/8/2PP2PB/P5N1/2B2R1P/R5K1 w - - 1 0",
        },
        {
            sol: "Qxh6+",
            fen: "1q5r/1b1r1p1k/2p1pPpb/p1Pp4/3B1P1Q/1P4P1/P4KB1/2RR4 w - - 1 0",
        },
        {
            sol: "h5+",
            fen: "r4R2/1b2n1pp/p2Np1k1/1pn5/4pP1P/8/PPP1B1P1/2K4R w - - 1 0",
        },
        {
            sol: "Nxd7+",
            fen: "r1bqk2r/bppp1ppp/8/PB2N3/3n4/B7/2PPQnPP/RN2K2R w KQkq - 1 0",
        },
        {
            sol: "Rxh2+",
            fen: "1r4k1/3b2pp/1b1pP2r/pp1P4/4q3/8/PP4RP/2Q2R1K b - - 0 1",
        },
        {
            sol: "Bb5+",
            fen: "8/2k2p2/2b3p1/P1p1Np2/1p3b2/1P1K4/5r2/R3R3 b - - 0 1",
        },
        {
            sol: "Rg8+",
            fen: "r4r1k/2qb3p/p2p1p2/1pnPN3/2p1Pn2/2P1N3/PPB1QPR1/6RK w - - 1 0",
        },
        {
            sol: "Qh8+",
            fen: "1r2q3/1R6/3p1kp1/1ppBp1b1/p3Pp2/2PP4/PP3P2/5K1Q w - - 1 0",
        },
        {
            sol: "Bh5+",
            fen: "r3kb1r/pb6/2p2p1p/1p2pq2/2pQ3p/2N2B2/PP3PPP/3RR1K1 w - - 1 0",
        },
        {
            sol: "Qh7+",
            fen: "4r3/2q1rpk1/p3bN1p/2p3p1/4QP2/2N4P/PP4P1/5RK1 w - - 1 0",
        },
        {
            sol: "Qxh7+",
            fen: "r5rk/pp1np1bn/2pp2q1/3P1bN1/2P1N2Q/1P6/PB2PPBP/3R1RK1 w - - 1 0",
        },
        {
            sol: "Ne5+",
            fen: "rn1qkb1r/4p2p/2p2nN1/p4p1Q/PpBP4/8/1P3PPP/R1B1K2R w - - 1 0",
        },
        {
            sol: "Qxg7+",
            fen: "r1b2rk1/ppppbpp1/7p/4R3/6Qq/2BB4/PPP2PPP/R5K1 w - - 1 0",
        },
        {
            sol: "Rh8+",
            fen: "1r3k2/2n1p1b1/3p2QR/p1pq1pN1/bp6/7P/2P2PP1/4RBK1 w - - 1 0",
        },
        {
            sol: "Rxh6+",
            fen: "5b2/1p3rpk/p1b3Rp/4B1RQ/3P1p1P/7q/5P2/6K1 w - - 1 0",
        },
        {
            sol: "Qxe8+",
            fen: "r2Rnk1r/1p2q1b1/7p/6pQ/4Ppb1/1BP5/PP3BPP/2K4R w - - 1 0",
        },
        {
            sol: "Rxe8+",
            fen: "r2qr2k/pp1b3p/2nQ4/2pB1p1P/3n1PpR/2NP2P1/PPP5/2K1R1N1 w - - 1 0",
        },
        {
            sol: "Qxh6+",
            fen: "4r3/p2r1p1k/3q1Bpp/4P3/1PppR3/P5P1/5P1P/2Q3K1 w - - 1 0",
        },
        {
            sol: "Qxh7+",
            fen: "r3n1rk/q3NQ1p/p2pbP2/1p4p1/1P1pP1P1/3R4/P1P4P/3B2K1 w - - 1 0",
        },
        {
            sol: "Kh6",
            fen: "8/2r2pk1/3p2p1/3Pb3/2P1P2K/6r1/1R2B3/1R6 b - - 0 1",
        },
        {
            sol: "Be1+",
            fen: "8/8/p3p3/3b1pR1/1B3P1k/8/4r1PK/8 w - - 1 0",
        },
        {
            sol: "Rxg7+",
            fen: "Q7/2r2rpk/2p4p/7N/3PpN2/1p2P3/1K4R1/5q2 w - - 1 0",
        },
        {
            sol: "Qxg7+",
            fen: "r3rknQ/1p1R1pb1/p3pqBB/2p5/8/6P1/PPP2P1P/4R1K1 w - - 1 0",
        },
        {
            sol: "Rg7",
            fen: "4rr2/1p5R/3p1p2/p2Bp3/P2bPkP1/1P5R/1P2K3/8 w - - 1 0",
        },
        {
            sol: "Bd6+",
            fen: "r4kr1/pbNn1q1p/1p6/2p2BPQ/5B2/8/P6P/b4RK1 w - - 1 0",
        },
        {
            sol: "Ng6+",
            fen: "6rk/6pp/5p2/p7/P2Q1N2/4P1P1/2r2n1P/6K1 w - - 1 0",
        },
        {
            sol: "Qh3+",
            fen: "1n6/p3q2p/2pNk3/1pP1p3/1P2P2Q/2P3P1/6K1/8 w - - 1 0",
        },
        {
            sol: "Rg1+",
            fen: "6rk/p3p2p/1p2Pp2/2p2P2/2P1nBr1/1P6/P6P/3R1R1K b - - 0 1",
        },
        {
            sol: "Qg1+",
            fen: "3rk3/1p3p2/2p5/7P/1P1qpp1R/P5P1/2Q5/3BK3 b - - 0 1",
        },
        {
            sol: "Rh8+",
            fen: "2QR4/6b1/1p4pk/7p/5n1P/4rq2/5P2/5BK1 w - - 1 0",
        },
        {
            sol: "Rf6",
            fen: "r3q1k1/5p2/3P2pQ/Ppp5/1pnbN2R/8/1P4PP/5R1K w - - 1 0",
        },
        {
            sol: "Re7+",
            fen: "5b2/R4p1p/1r2kp2/1p2pN2/2r1P3/P1P3P1/1PK4P/3R4 w - - 1 0",
        },
        {
            sol: "Qh6+",
            fen: "r3q1r1/1p2bNkp/p3n3/2PN1B1Q/PP1P1p2/7P/5PP1/6K1 w - - 1 0",
        },
        {
            sol: "Qxh7+",
            fen: "1r2q2k/4N2p/3p1Pp1/2p1n1P1/2P5/p2P2KQ/P3R3/8 w - - 1 0",
        },
        {
            sol: "Rf6+",
            fen: "5R2/4r1r1/1p4k1/p1pB2Bp/P1P4K/2P1p3/1P6/8 w - - 1 0",
        },
        {
            sol: "Qf7+",
            fen: "2bq1rk1/r1p1b1pn/p2pP1Np/1p1B1Q2/4P3/2P4P/PP3PP1/R1B1R1K1 w - - 1 0",
        },
        {
            sol: "Bb6+",
            fen: "1nbk1b1r/1r6/p2P2pp/1B2PpN1/2p2P2/2P1B3/7P/R3K2R w - - 1 0",
        },
        {
            sol: "Rxg6+",
            fen: "3r2k1/p1p2p2/bp2p1nQ/4PB1P/2pr3q/6R1/PP3PP1/3R2K1 w - - 1 0",
        },
        {
            sol: "Qh8+",
            fen: "6k1/3r3p/p1q3pP/1p1p4/3Q4/4R1P1/P4PK1/8 w - - 1 0",
        },
        {
            sol: "Rxh3+",
            fen: "2k4r/ppp5/4bqp1/3p2Q1/6n1/2NB3P/PPP2bP1/R1B2R1K b - - 0 1",
        },
        {
            sol: "Rxh7+",
            fen: "r2r3k/b1qn2pp/1p2Bp2/2p2P2/PP1pQ3/7R/1B3PPP/5RK1 w - - 1 0",
        },
        {
            sol: "Nf5+",
            fen: "8/1p3Qb1/p5pk/P1p1p1p1/1P2P1P1/2P1N2n/5P1P/4qB1K w - - 1 0",
        },
        {
            sol: "Rxf7+",
            fen: "3rrk2/2p2pR1/p4n2/1p1PpP2/2p2q1P/3P1BQ1/PPP5/6RK w - - 1 0",
        },
        {
            sol: "Rf7+",
            fen: "r4kr1/1b2R1n1/pq4p1/4Q3/1p4P1/5P2/PPP4P/1K2R3 w - - 1 0",
        },
        {
            sol: "f5+",
            fen: "3n4/1R6/p5k1/2B5/1P3PK1/r7/8/8 w - - 1 0",
        },
        {
            sol: "Rh8+",
            fen: "1r3rk1/1pnnq1bR/p1pp2B1/P2P1p2/1PP1pP2/2B3P1/5PK1/2Q4R w - - 1 0",
        },
        {
            sol: "Qxf2+",
            fen: "b3r1k1/5ppp/p2p4/p4qN1/Q2b4/6R1/5PPP/5RK1 b - - 0 1",
        },
        {
            sol: "Qxf8+",
            fen: "5r1k/pp1n1p1p/5n1Q/3p1pN1/3P4/1P4RP/P1r1qPP1/R5K1 w - - 1 0",
        },
        {
            sol: "Re8+",
            fen: "5k2/p3Rr2/1p4pp/q4p2/1nbQ1P2/6P1/5N1P/3R2K1 w - - 1 0",
        },
        {
            sol: "Rxf6+",
            fen: "4rk2/pp2N1bQ/5p2/8/2q5/P7/3r2PP/4RR1K w - - 1 0",
        },
        {
            sol: "Qh3+",
            fen: "r4rk1/4bp2/1Bppq1p1/4p1n1/2P1Pn2/3P2N1/P2Q1PBK/1R5R b - - 0 1",
        },
        {
            sol: "Nf3",
            fen: "2q1r3/4pR2/3rQ1pk/p1pnN2p/Pn5B/8/1P4PP/3R3K w - - 1 0",
        },
        {
            sol: "Qxe6+",
            fen: "q2br1k1/1b4pp/3Bp3/p6n/1p3R2/3B1N2/PP2QPPP/6K1 w - - 1 0",
        },
        {
            sol: "Rg8+",
            fen: "5r1k/p2n1p1p/5P1N/1p1p4/2pP3P/8/PP4RK/8 w - - 1 0",
        },
        {
            sol: "Qe8+",
            fen: "8/7p/5pk1/3n2pq/3N1nR1/1P3P2/P6P/4QK2 w - - 1 0 ",
        },
        {
            sol: "Rxf5+",
            fen: "2Q5/pp2rk1p/3p2pq/2bP1r2/5RR1/1P2P3/PB3P1P/7K w - - 1 0",
        },
        {
            sol: "Qxh2+",
            fen: "4r1k1/pQ3pp1/7p/4q3/4r3/P7/1P2nPPP/2BR1R1K b - - 0 1",
        },
        {
            sol: "Rxf8+",
            fen: "3R1rk1/1pp2pp1/1p6/8/8/P7/1q4BP/3Q2K1 w - - 1 0",
        },
        {
            sol: "Rxg6+",
            fen: "6k1/5p2/p3bRpQ/4q3/2r3P1/6NP/P1p2R1K/1r6 w - - 1 0",
        },
        {
            sol: "Bf2+",
            fen: "rnb1k2r/pp3ppp/1qp2B2/2bPp3/4P3/2N5/PPP3PP/R2QKBNR b KQkq - 0 1",
        },
        {
            sol: "Qxc3+",
            fen: "r2r4/pp2ppkp/2P3p1/q1p5/4PQ2/2P2b2/P4PPP/2R1KB1R b - - 0 1",
        },
        {
            sol: "Nd4+",
            fen: "8/8/2N1P3/1P6/4Q3/4b2K/4k3/4q3 w - - 1 0",
        },
        {
            sol: "Qxh3+",
            fen: "1b2r1k1/3n2p1/p3p2p/1p3r2/3PNp1q/3BnP1P/PP1BQP1K/R6R b - - 0 1",
        },
        {
            sol: "Nf4+",
            fen: "5b2/q4r1p/p3k1p1/2pNppP1/1P6/3Q1P1P/P7/1K1R4 w - - 1 0",
        },
        {
            sol: "Qg2+",
            fen: "8/2p5/Q4pk1/p1Pp4/5n2/PP3PK1/2q4N/8 b - - 0 1",
        },
        {
            sol: "Qxh7+",
            fen: "r3nr1k/1b2Nppp/pn6/q3p1P1/P1p4Q/R7/1P2PP1P/2B2RK1 w - - 1 0",
        },
        {
            sol: "Qh2+",
            fen: "r1b3nr/ppp1kB1p/3p4/8/3PPBnb/1Q3p2/PPP2q2/RN4RK b - - 0 1",
        },
        {
            sol: "Qh1+",
            fen: "q5k1/5rb1/r6p/1Np1n1p1/3p1Pn1/1N4P1/PP5P/R1BQRK2 b - - 0 1",
        },
        {
            sol: "Qxh3+",
            fen: "8/2P2pk1/3Q4/4pq2/7p/6pP/2r3P1/6RK b - - 0 1",
        },
        {
            sol: "Rxg7+",
            fen: "8/p1R3p1/4p1kn/3p3N/3Pr2P/6P1/PP3K2/8 w - - 1 0",
        },
        {
            sol: "Qd8+",
            fen: "r1b1k2r/1p2bppp/p3q3/1p2p1B1/8/3Q1N2/PPP2PPP/3R1RK1 w kq - 1 0",
        },
        {
            sol: "Rd8+",
            fen: "rn2k2r/pp2b2p/2p1Q1p1/5B2/1q3B2/8/PPP3PP/3RR2K w kq - 1 0",
        },
        {
            sol: "Rd8+",
            fen: "r1b1k2r/pp3ppp/2n1p3/6B1/2p1q3/Q7/PP2PPPP/3RKB1R w Kkq - 1 0",
        },
        {
            sol: "Nd5+",
            fen: "2k4r/1pp1n1pp/p1pr1pb1/4p3/Nq2P1P1/1P1PKN1P/2P1QP2/3R3R b - - 0 1",
        },
        {
            sol: "Rc8+",
            fen: "5k1r/4npp1/p3p2p/3nP2P/3P3Q/3N4/qB2KPP1/2R5 w - - 1 0",
        },
        {
            sol: "g5+",
            fen: "2r5/2R5/3npkpp/3bN3/p4PP1/4K3/P1B4P/8 w - - 1 0",
        },
        {
            sol: "Rh4+",
            fen: "5r1r/1p6/p1p2p2/2P1bPpk/4R3/6PP/P2B2K1/3R4 w - - 1 0",
        },
        {
            sol: "Ng6+",
            fen: "5qrk/5p1n/pp3p1Q/2pPp3/2P1P1rN/2P4R/P5P1/2B3K1 w - - 1 0",
        },
        {
            sol: "Qxe6+",
            fen: "3rk2r/p1qn1pp1/1p2pb1p/7P/2Pp4/B1P1QP2/P1B1KP2/3R3R w k - 1 0",
        },
        {
            sol: "Bf7+",
            fen: "r3kb1r/q5pp/p1p1Bnn1/1p2Q3/8/2N2PBP/PPP5/2KRR3 w - - 1 0",
        },
        {
            sol: "Ne7+",
            fen: "rq3rk1/3n1pp1/pb4n1/3N2P1/1pB1QP2/4B3/PP6/2KR3R w - - 1 0",
        },
        {
            sol: "Nh8+",
            fen: "3q2r1/p2b1k2/1pnBp1N1/3p1pQP/6P1/5R2/2r2P2/4RK2 w - - 1 0",
        },
        {
            sol: "Rxf1+",
            fen: "8/p4pk1/6p1/3R4/3nqN1P/2Q3P1/5P2/3r1BK1 b - - 0 1",
        },
        {
            sol: "Bxg6+",
            fen: "2r5/3nbkp1/2q1p1p1/1p1n2P1/3P4/2p1P1NQ/1P1B1P2/1B4KR w - - 1 0",
        },
        {
            sol: "Nxf7+",
            fen: "r1bq1rkb/ppp2n1p/5n2/4p1NN/5pQ1/1BP5/PP3PPP/R1B1K2R w KQ - 1 0",
        },
        {
            sol: "Re5+",
            fen: "4r3/1b2r2p/p2p2k1/P1pP1R1N/3b4/1P1B3P/3n2P1/5R1K w - - 1 0",
        },
        {
            sol: "Rf8+",
            fen: "2b3k1/1p5p/2p1n1pQ/3qB3/3P4/3B3P/r5P1/5RK1 w - - 1 0",
        },
        {
            sol: "Rxe6+",
            fen: "3rk2r/1pR2p2/b2BpPp1/p2p4/8/1P6/P4PPP/4R1K1 w - - 1 0",
        },
        {
            sol: "Rxh7+",
            fen: "4nr1k/1bq3pp/5p2/1p2pNQ1/3pP3/1B1P3R/1PP3PP/6K1 w - - 1 0",
        },
        {
            sol: "Nxb7+",
            fen: "r1bk1r2/pp1n2pp/3NQ3/1P6/8/2n2PB1/q1B3PP/3R1RK1 w - - 1 0",
        },
        {
            sol: "Qg8+",
            fen: "1rb2k2/pp3ppQ/7q/2p1n1N1/2p5/2N5/P3BP1P/K2R4 w - - 1 0",
        },
        {
            sol: "Qxh6+",
            fen: "4r3/5p1k/2p1nBpp/q2p4/P1bP4/2P1R2Q/2B2PPP/6K1 w - - 1 0",
        },
        {
            sol: "Ra1+",
            fen: "2r3k1/6pp/4pp2/3bp3/1Pq5/3R1P2/r1PQ2PP/1K1RN3 b - - 0 1",
        },
        {
            sol: "Rh8+",
            fen: "6R1/5r1k/p6b/1pB1p2q/1P6/5rQP/5P1K/6R1 w - - 1 0",
        },
        {
            sol: "Bg6+",
            fen: "r5q1/pp1b1kr1/2p2p2/2Q5/2PpB3/1P4NP/P4P2/4RK2 w - - 1 0",
        },
        {
            sol: "Qd8+",
            fen: "2r1kb1r/p2b1ppp/3p4/Q2Np1B1/4P2P/8/PP4P1/4KB1n w k - 1 0",
        },
        {
            sol: "Qh5+",
            fen: "5rk1/ppp2pbp/3p2p1/1q6/4r1P1/1NP1B3/PP2nPP1/R2QR2K b - - 0 1",
        },
        {
            sol: "Qxg6+",
            fen: "r2q1bk1/5n1p/2p3pP/p7/3Br3/1P3PQR/P5P1/2KR4 w - - 1 0",
        },
        {
            sol: "Qxa3+",
            fen: "2b5/k2n1p2/p2q4/5R1B/2p4P/P1b5/KPQ1R3/6r1 b - - 0 1",
        },
        {
            sol: "Bg6+",
            fen: "4Q3/r4ppk/3p3p/4pPbB/2P1P3/1q5P/6P1/3R3K w - - 1 0",
        },
        {
            sol: "Nf4+",
            fen: "rn5r/p4pp1/3n3p/qB1k4/3P4/4P3/PP2NPPP/R4K1R w - - 1 0",
        },
        {
            sol: "Qxc3+",
            fen: "r2r2k1/pp2bppp/2p1p3/4qb1P/8/1BP1BQ2/PP3PP1/2KR3R b - - 0 1",
        },
        {
            sol: "Ne6+",
            fen: "5R2/6k1/3K4/p6r/1p1NB3/1P4r1/8/8 w - - 1 0",
        },
        {
            sol: "Nxf7+",
            fen: "5r2/1qp2pp1/bnpk3p/4NQ2/2P5/1P5P/5PP1/4R1K1 w - - 1 0",
        },
        {
            sol: "Rxd8+",
            fen: "3nk1r1/1pq4p/p3PQpB/5p2/2r5/8/P4PPP/3RR1K1 w - - 1 0",
        },
        {
            sol: "Ng3+",
            fen: "5rk1/5ppp/pq6/1r3n2/2Q2P2/1P1N4/P1P1R1PP/4R2K b - - 0 1",
        },
        {
            sol: "Re8+",
            fen: "1k3r2/4R1Q1/p2q1r2/8/2p1Bb2/5R2/pP5P/K7 w - - 1 0",
        },
        {
            sol: "Bxf3+",
            fen: "2k1r2r/ppp3p1/3b4/3pq2b/7p/2NP1P2/PPP2Q1P/R5RK b - - 0 1",
        },
        {
            sol: "Rh2+",
            fen: "3k4/1p3Bp1/p5r1/2b5/P3P1N1/5Pp1/1P1r4/2R4K b - - 0 1",
        },
        {
            sol: "Re8+",
            fen: "6k1/1r4np/pp1p1R1B/2pP2p1/P1P5/1n5P/6P1/4R2K w - - 1 0",
        },
        {
            sol: "Bh6",
            fen: "8/p2q1p1k/4pQp1/1p1b2Bp/7P/8/5PP1/6K1 w - - 1 0",
        },
        {
            sol: "Qb5+",
            fen: "r7/6R1/ppkqrn1B/2pp3p/P6n/2N5/8/1Q1R1K2 w - - 1 0",
        },
        {
            sol: "Qh6+",
            fen: "r2q1k1r/3bnp2/p1n1pNp1/3pP1Qp/Pp1P4/2PB4/5PPP/R1B2RK1 w - - 1 0",
        },
        {
            sol: "Rxh7+",
            fen: "6rk/1r2pR1p/3pP1pB/2p1p3/P6Q/P1q3P1/7P/5BK1 w - - 1 0",
        },
        {
            sol: "Rxf7+",
            fen: "1r2Rr2/3P1p1k/5Rpp/qp6/2pQ4/7P/5PPK/8 w - - 1 0",
        },
        {
            sol: "Rxf8+",
            fen: "r4rk1/5Rbp/p1qN2p1/P1n1P3/8/1Q3N1P/5PP1/5RK1 w - - 1 0",
        },
        {
            sol: "Rh6",
            fen: "7R/3r4/8/3pkp1p/5N1P/b3PK2/5P2/8 w - - 1 0",
        },
        {
            sol: "Bf5+",
            fen: "8/1R3p2/3rk2p/p2p2p1/P2P2P1/3B1PN1/5K1P/r7 w - - 1 0",
        },
        {
            sol: "Rxh6+",
            fen: "8/5prk/p5rb/P3N2R/1p1PQ2p/7P/1P3RPq/5K2 w - - 1 0",
        },
        {
            sol: "Qe6+",
            fen: "rqb2bk1/3n2pr/p1pp2Qp/1p6/3BP2N/2N4P/PPP3P1/2KR3R w - - 1 0",
        },
        {
            sol: "Rxa7+",
            fen: "1Q6/r3R2p/k2p2pP/p1q5/Pp4P1/5P2/1PP3K1/8 w - - 1 0",
        },
        {
            sol: "Rg2+",
            fen: "N5k1/5p2/6p1/6Pp/4bb1P/P5r1/7K/2R3R1 b - - 0 1",
        },
        {
            sol: "Qg4+",
            fen: "3R4/3Q1p2/q1rn2kp/4p3/4P3/2N3P1/5P1P/6K1 w - - 1 0",
        },
        {
            sol: "Qh1+",
            fen: "6R1/2k2P2/1n5r/3p1p2/3P3b/1QP2p1q/3R4/6K1 b - - 0 1",
        },
        {
            sol: "g4+",
            fen: "5r2/7p/3R4/p3pk2/1p2N2p/1P2BP2/6PK/4r3 w - - 1 0",
        },
        {
            sol: "Qc6+",
            fen: "7r/3kbp1p/1Q3R2/3p3q/p2P3B/1P5K/P6P/8 w - - 1 0",
        },
        {
            sol: "Rg8+",
            fen: "r4r1k/p2p3p/bp1Np3/4P3/2P2nR1/3B1q2/P1PQ4/2K3R1 w - - 1 0",
        },
        {
            sol: "Bf6+",
            fen: "1r3b2/1bp2pkp/p1q4N/1p1n1pBn/8/2P3QP/PPB2PP1/4R1K1 w - - 1 0",
        },
        {
            sol: "Qc6",
            fen: "8/k1p1q3/Pp5Q/4p3/2P1P2p/3P4/4K3/8 w - - 1 0",
        },
        {
            sol: "f2+",
            fen: "8/pp2k3/7r/2P1p1p1/4P3/5pq1/2R3N1/1R3BK1 b - - 0 1",
        },
        {
            sol: "Ne2+",
            fen: "7k/p5b1/1p4Bp/2q1p1p1/1P1n1r2/P2Q2N1/6P1/3R2K1 b - - 0 1",
        },
        {
            sol: "Rh6+",
            fen: "8/p4q2/6k1/1p3rP1/3Q4/8/PPP5/K6R w - - 1 0",
        },
        {
            sol: "Rc1+",
            fen: "2r3k1/1p3ppp/p3p3/7P/P4P2/1R2QbP1/6q1/1B2K3 b - - 0 1",
        },
        {
            sol: "Ne4+",
            fen: "6r1/p6k/Bp3n1r/2pP1P2/P4q1P/2P2Q2/5K2/2R2R2 b - - 0 1",
        },
        {
            sol: "Ng4",
            fen: "8/8/8/5P2/R2p1N2/4n1r1/PP6/5k1K b - - 0 1",
        },
        {
            sol: "Rf7+",
            fen: "r7/4k1Pp/2n1p2P/q2pp1N1/1p4P1/1P6/P4R2/1K1R4 w - - 1 0",
        },
        {
            sol: "Qd8+",
            fen: "2Q5/1p3p2/3b1k1p/3Pp3/4B1R1/4q1P1/r4PK1/8 w - - 1 0",
        },
        {
            sol: "Rxh6+",
            fen: "8/5Qpk/p1R4p/P2p4/6P1/2rq4/5PPK/8 w - - 1 0",
        },
        {
            sol: "Qg7+",
            fen: "3n1k2/5p2/2p1bb2/1p2pN1q/1P2P3/2P3Q1/5PB1/3R2K1 w - - 1 0",
        },
        {
            sol: "Be5+",
            fen: "rnR5/p3p1kp/4p1pn/bpP5/5BP1/5N1P/2P2P2/2K5 w - - 1 0",
        },
        {
            sol: "Rxh6+",
            fen: "6rk/6p1/4R2p/p2pP2b/5Q2/2P2PB1/1q4PK/8 w - - 1 0",
        },
        {
            sol: "Re4+",
            fen: "1Q6/8/3p1pk1/2pP4/1p3K2/5R2/5qP1/4r3 b - - 0 1",
        },
        {
            sol: "Nf7+",
            fen: "r4r1k/pp5p/n5p1/1q2Np1n/1Pb5/6P1/PQ2PPBP/1RB3K1 w - - 1 0",
        },
        {
            sol: "Rxh6+",
            fen: "7k/p1p2bp1/3q1N1p/4rP2/4pQ2/2P4R/P2r2PP/4R2K w - - 1 0",
        },
        {
            sol: "Rf1+",
            fen: "7k/2p3pp/p7/1p1p4/PP2pr2/B1P3qP/4N1B1/R1Qn2K1 b - - 0 1",
        },
        {
            sol: "Rg8+",
            fen: "r1b2k2/1p1p1r1B/n4p2/p1qPp3/2P4N/4P1R1/PPQ3PP/R5K1 w - - 1 0",
        },
    ]);
}
