DefineModule('helpers/gradients', function (require) {

    function calcChroma(color) {
        var M = Math.max(color.R, color.G, color.B);
        var m = Math.min(color.R, color.G, color.B);

        return M - m;
    }



    return {
        GreenToRed: [ "#0AF448", "#0BF440", "#0BF437", "#0CF42E", "#0CF426",
            "#0DF41D", "#0DF415", "#0FF40D", "#18F40E", "#22F40E", "#2BF40F",
            "#34F40F", "#3DF410", "#47F410", "#50F410", "#59F411", "#62F411",
            "#6BF412", "#74F412", "#7DF413", "#86F413", "#8FF413", "#98F414",
            "#A1F414", "#AAF415", "#B2F415", "#BBF415", "#C4F416", "#CDF416",
            "#D5F417", "#DEF417", "#E7F418", "#EFF418", "#F4F018", "#F4E819",
            "#F4DF19", "#F4D71A", "#F4CE1A", "#F4C61B", "#F4BE1B", "#F4B51B",
            "#F4AD1C", "#F4A51C", "#F49D1D", "#F4941D", "#F48C1E", "#F4841E",
            "#F47C1E", "#F4741F", "#F46C1F", "#F46420", "#F45C20", "#F45421",
            "#F44C21", "#F44421", "#F43D22", "#F43522", "#F42D23", "#F42523",
            "#F52429" ]
    };
});
