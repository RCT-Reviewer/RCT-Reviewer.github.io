(function () {
    var v = document.getElementById('content-video');
    if (v) {
        v.playbackRate = 1.5;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    v.play();
                } else {
                    v.pause();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(v);
    }

    var citations = {
        rct: {
            apa: "Sahu, V. (2026). RCT-Reviewer: A Modernized, Standalone Tool for Automated Analysis of Clinical Trials (RCTs). Zenodo. https://doi.org/10.5281/zenodo.20618338",
            vancouver: "Sahu V. RCT-Reviewer: A Modernized, Standalone Tool for Automated Analysis of Clinical Trials (RCTs). Zenodo; 2026. Available from: https://doi.org/10.5281/zenodo.20618338",
            mla: "Sahu, V. \"RCT-Reviewer: A Modernized, Standalone Tool for Automated Analysis of Clinical Trials (RCTs).\" Zenodo, 2026, doi:10.5281/zenodo.20618338.",
            chicago: "Sahu, V. 2026. \"RCT-Reviewer: A Modernized, Standalone Tool for Automated Analysis of Clinical Trials (RCTs).\" Zenodo. https://doi.org/10.5281/zenodo.20618338.",
            harvard: "Sahu, V. (2026) 'RCT-Reviewer: A Modernized, Standalone Tool for Automated Analysis of Clinical Trials (RCTs)', Zenodo. Available at: https://doi.org/10.5281/zenodo.20618338.",
            bibtex: "@software{RCT-Reviewer,\n  author    = {Sahu, V.},\n  title     = {RCT-Reviewer: A Modernized, Standalone Tool for\n               Automated Analysis of Clinical Trials (RCTs)},\n  year      = {2026},\n  publisher = {Zenodo},\n  doi       = {10.5281/zenodo.20618338},\n  url       = {https://doi.org/10.5281/zenodo.20618338}\n}",
            ris: "TY  - COMP\nAU  - Sahu, V.\nPY  - 2026\nTI  - RCT-Reviewer: A Modernized, Standalone Tool for Automated Analysis of Clinical Trials (RCTs)\nPB  - Zenodo\nDO  - 10.5281/zenodo.20618338\nUR  - https://doi.org/10.5281/zenodo.20618338\nER  - "
        },
        robot: {
            apa: "Marshall, I. J., Kuiper, J., Banner, E., & Wallace, B. C. (2017). Automating Biomedical Evidence Synthesis: RobotReviewer. Proceedings of the Conference of the Association for Computational Linguistics (ACL), 7–12.",
            vancouver: "Marshall IJ, Kuiper J, Banner E, Wallace BC. Automating Biomedical Evidence Synthesis: RobotReviewer. Proceedings of the Conference of the Association for Computational Linguistics (ACL). 2017:7-12.",
            mla: "Marshall, Iain J., et al. \"Automating Biomedical Evidence Synthesis: RobotReviewer.\" Proceedings of the Conference of the Association for Computational Linguistics (ACL), 2017, pp. 7-12.",
            chicago: "Marshall, Iain J., Joël Kuiper, Edward Banner, and Byron C. Wallace. 2017. \"Automating Biomedical Evidence Synthesis: RobotReviewer.\" Proceedings of the Conference of the Association for Computational Linguistics (ACL). 7–12.",
            harvard: "Marshall, I. J. et al. (2017) 'Automating Biomedical Evidence Synthesis: RobotReviewer', Proceedings of the Conference of the Association for Computational Linguistics (ACL), pp. 7–12.",
            bibtex: "@article{RobotReviewer2017,\n  title    = \"Automating Biomedical Evidence Synthesis: {RobotReviewer}\",\n  author   = \"Marshall, Iain J and Kuiper, Jo{\\\"e}l and Banner, Edward and Wallace, Byron C\",\n  journal  = \"Proceedings of the Conference of the Association for Computational Linguistics (ACL)\",\n  volume   = 2017,\n  pages    = \"7--12\",\n  month    = jul,\n  year     = 2017,\n}",
            ris: "TY  - CONF\nAU  - Marshall, Iain J.\nAU  - Kuiper, Joël\nAU  - Banner, Edward\nAU  - Wallace, Byron C.\nPY  - 2017\nTI  - Automating Biomedical Evidence Synthesis: RobotReviewer\nT2  - Proceedings of the Conference of the Association for Computational Linguistics (ACL)\nSP  - 7\nEP  - 12\nER  - "
        }
    };

    var refSelect = document.getElementById('cite-ref');
    var styleSelect = document.getElementById('cite-style');
    var output = document.getElementById('cite-output');
    var copyBtn = document.getElementById('copy-cite');
    var dlBtn = document.getElementById('download-cite');

    function updateCitation() {
        var ref = refSelect.value;
        var style = styleSelect.value;
        if (citations[ref] && citations[ref][style]) {
            output.textContent = citations[ref][style];
        }
    }

    if (refSelect && styleSelect) {
        refSelect.addEventListener('change', updateCitation);
        styleSelect.addEventListener('change', updateCitation);
        updateCitation();
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', function () {
            var text = output.textContent;
            navigator.clipboard.writeText(text).then(function () {
                var originalText = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                setTimeout(function () {
                    copyBtn.textContent = originalText;
                }, 2000);
            }).catch(function (err) {
                console.error('Could not copy text: ', err);
            });
        });
    }

    if (dlBtn) {
        dlBtn.addEventListener('click', function () {
            var text = output.textContent;
            var style = styleSelect.value;
            var ref = refSelect.value;
            var filename = ref === 'rct' ? 'RCT-Reviewer' : 'RobotReviewer';
            var ext = 'txt';

            if (style === 'bibtex') ext = 'bib';
            if (style === 'ris') ext = 'ris';

            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename + '.' + ext);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        });
    }
})();