
var fields = [
    'patchName',
    'oscALevel',
    'oscBLevel',
    'noiseLevel',
    'unison',
    'oscFX',
    'detune',
    'lfoSyncFreq',
    'midiClkTimeInterval',
    'lfoTempoValue',
    'keytrackingAmount',
    'glideSpeed',
    'oscPitchA',
    'oscPitchB',
    'oscWaveformA',
    'oscWaveformB',
    'pwmSource',
    'pwmAmtA',
    'pwmAmtB',
    'pwmRate',
    'pwA',
    'pwB',
    'filterRes',
    'filterFreq',
    'filterMix',
    'filterEnv',
    'oscLfoAmt',
    'oscLfoRate',
    'oscLFOWaveform',
    'oscLfoRetrig',
    'oscLFOMidiClkSync',
    'filterLfoRate',
    'filterLfoRetrig',
    'filterLFOMidiClkSync',
    'filterLfoAmt',
    'filterLfoWavefor',
    'filterAttack',
    'filterDecay',
    'filterSustain',
    'filterRelease',
    'ampAttack',
    'ampDecay',
    'ampSustain',
    'ampRelease',
    'fxAmt',
    'fxMix',
    'pitchEnv',
    'velocitySens',
    'chordDetune',
    'spare1',
    'spare2',
    'spare3'
];

var i = 0;
var presets_data = [];
for (i = 0; i < presets_raw.length; i++) {
    presets_data.push(presets_raw[i].split(','));
}

var presets_name = [];
for (i = 0; i < presets_raw.length; i++) {
    presets_name.push(presets_data[i][0]);
}

function init_presets() {
    for (i = 0; i < presets_name.length; i++) {
        $('#presets').append($("<option />").val(i).text(presets_name[i]));
    }
    $('#presets').change(function() {
        loadpreset(this.value);
    });
}

const l1 = 91;
const l2 = l1 + 113;
const l3 = l2 + 113;
const l4 = l3 + 113;

const c1 = 76;
const c2 = c1 + 105;
const c3 = c2 + 105;
const c4 = c3 + 104;
const c5 = c4 + 105;
const c6 = c5 + 104;
const c7 = c6 + 105;
const c8 = c7 + 105;
const c8a = c7 + 130
const c8b = c7 + 172;
const c9 = c8 + 166;
const c10 = c9 + 103;

function loadpreset(index) {
    
    // clean first
    $('#tsynth').children().remove();

    var data = presets_data[index];

    patchName = data[0];   

    var oscALevel = parseFloat(data[1]);
    var oscBLevel = parseFloat(data[2]);
    var oscMix = 50;
    if (oscALevel < 1) {
        oscMix += Math.round(oscALevel*50);
    } else if (oscBLevel < 1) {
        oscMix = Math.round(oscBLevel*50);
    }
    addknob('oscMix', 'default', oscMix, l1, c4);
  
    addknob('noiseLevel', 'f', Math.round(parseFloat(data[3])*100), l3, c1);
    /*
    lfoSyncFreq = data[7].parseInt();
    midiClkTimeInterval = data[8].parseInt();
    lfoTempoValue = data[9].parseFloat();
    keytrackingAmount = data[10].parseFloat();
    */
    addknob('glideSpeed', 'f', Math.round(parseFloat(data[11])*100), l3, c9);
    addknob('oscPitchA', 'pitch', data[12], l1, c1);
    addknob('oscPitchB' ,'pitch', data[13], l2, c1);
    addknob('oscWaveformA', 'oA', data[14], l1, c2);
    addknob('oscWaveformB', 'oA', data[15], l2, c2);
    /*
    pwmSource = data[16].parseInt();
    */
    addknob('pwmAmtA', 'f', Math.round(parseFloat(data[17])*100), l1, c3);
    addknob('pwmAmtB', 'f', Math.round(parseFloat(data[18])*100), l2, c3);
    addknob('pwmRate', 'f', Math.round(parseFloat(data[19])*100), l3, c3);
    /*
    pwA = data[20].parseFloat();
    pwB = data[21].parseFloat();
    */
    addknob('filterRes', 'fr', parseFloat(data[22]), l2, c6);
    addknob('filterMix', 'f', Math.round(parseFloat(data[24])*100), l2, c7);
    addknob('filterEnv', 'linearcenter', parseFloat(data[25]), l2, c8);
    addknob('filterFreq', 'ff', parseInt(data[23]), l2, c5);
    addknob('oscLfoAmt', 'f', Math.round(parseFloat(data[26])*100), l4, c1);
    addknob('oscLfoRate', 'f', Math.round(parseFloat(data[27])*100), l4, c3);
    addknob('oscLFOWaveform', 'lfo', data[28], l4, c2);
    /*
    oscLfoRetrig = data[29].parseInt();
    */
    
    addknob('filterLfoAmt', 'f', Math.round(parseFloat(data[34])*100), l3, c5);
    addknob('filterLfoWaveform', 'lfo', data[35], l3, c6);

    addknob('filterAttack', 's', parseFloat(data[36]), l1, c5);
    addknob('filterDecay', 's', parseFloat(data[37]), l1, c6);
    addknob('filterSustain', 'f', Math.round(parseFloat(data[38])*100), l1, c7);
    addknob('filterRelease', 's', parseFloat(data[39]), l1, c8);

    addknob('ampAttack', 's', parseFloat(data[40]), l4, c5);
    addknob('ampDecay', 's', parseFloat(data[41]), l4, c6);
    addknob('ampSustain', 'f', Math.round(parseFloat(data[42])*100), l4, c7);
    addknob('ampRelease', 's', parseFloat(data[43]), l4, c8);

    addknob('fxAmt', 'fx', parseFloat(data[44]), l4, c9);
    addknob('fxMix', 'f', Math.round(parseFloat(data[45])*100), l4, c10);
     addknob('pitchEnv', 'linearcenter', parseFloat(data[46]), l3, c2);
    /*
    velocitySens = data[47].parseFloat();
    */

    var unisonLabels = ['off', 'on', 'chord'];
    var unison = parseInt(data[4]);
    addlabel('unison', unisonLabels[unison], l4, c4);
    if (unison == 2) {
        addknob('chordDetune', 'cd', parseInt(data[48]), l2, c4);
    } else {
        addknob('detune', 'detune', parseFloat(data[6]), l2, c4);
    }

    var oscfxlabels = ['off', 'XOR', 'XMod'];
    addlabel('oscFX', oscfxlabels[parseInt(data[5])], l3, c4)

    var filterLFOMidiClkSync = parseInt(data[33]);
    if (filterLFOMidiClkSync == 1) {
        // TODO
    } else {
        addknob('filterLfoRate', 'lforate', Math.round(parseFloat(data[31])*100), l3, c7);
    }


    var onoff = ['off', 'on'];
    addlabel('filterLfoRetrig', onoff[parseInt(data[32])], l3, c8b);



    var table = $('#parameters').DataTable();
    table.rows().remove();
    for(var i = 0; i < data.length; i++) {
        table.row.add([i, fields[i], data[i]])
    }
    table.draw();

}

function init_table() {
    $('#parameters').DataTable({
        paging: false,
        searching: false,
        autoWidth: false,
        info: false,
    });
  
}

function addlabel(name, label, top, left) {
    $("#tsynth").append("<span id='" + name + "' class='label'>" + label + "</span>");
    $("#" + name).css("position", 'absolute');
    $("#" + name).css("top", top + 'px');
    $("#" + name).css("left", left + 'px');
}

var pitches = ["-24", "-12", "-11", "-10", "-9", "-8", "-7", "-6", "-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "24"];
var oscAwf = ["19", "3", "11", "9", "12", "8", "103", "104"];
var oscBwf = ["19", "7", "11", "9", "12", "8", "103", "104"];
var lfowf = [ "0", "3", "6", "1", "2", "7"]
var filterfreqs = [20, 21, 22, 23, 24, 26, 27, 28, 29, 31, 32, 33, 34, 35, 36, 38, 39, 40, 41, 43, 44, 46, 47, 49, 50, 52, 53, 55, 57, 59, 61, 63, 65, 68, 70, 73, 76, 78, 81, 84, 87, 91, 94, 98, 102, 106, 110, 114, 119, 123, 128, 133, 138, 144, 149, 155, 161, 167, 174, 181, 187, 195, 202, 210, 218, 226, 234, 243, 252, 261, 271, 281, 291, 301, 312, 323, 334, 346, 358, 370, 383, 395, 409, 422, 436, 451, 465, 480, 496, 512, 528, 544, 561, 578, 596, 614, 633, 652, 671, 691, 711, 732, 753, 774, 796, 818, 841, 865, 888, 913, 937, 962, 988, 1014, 1041, 1068, 1096, 1124, 1152, 1182, 1211, 1242, 1272, 1304, 1335, 1368, 1401, 1434, 1468, 1503, 1538, 1574, 1610, 1647, 1684, 1722, 1761, 1800, 1840, 1881, 1922, 1964, 2006, 2049, 2093, 2137, 2182, 2227, 2274, 2320, 2368, 2416, 2465, 2515, 2565, 2616, 2668, 2720, 2773, 2827, 2881, 2936, 2992, 3049, 3106, 3164, 3223, 3283, 3343, 3404, 3466, 3529, 3592, 3656, 3721, 3787, 3853, 3921, 3989, 4058, 4127, 4198, 4269, 4341, 4414, 4488, 4563, 4638, 4715, 4792, 4870, 4949, 5029, 5109, 5191, 5273, 5357, 5441, 5526, 5612, 5699, 5787, 5876, 5965, 6056, 6147, 6240, 6333, 6427, 6523, 6619, 6716, 6814, 6913, 7013, 7114, 7216, 7319, 7424, 7529, 7635, 7742, 7850, 7959, 8069, 8180, 8292, 8405, 8519, 8634, 8751, 8868, 8986, 9106, 9226, 9348, 9471, 9594, 9719, 9845, 9972, 10100, 10230, 10360, 10491, 10624, 10758, 10893, 11029, 11166, 11304, 11443, 11584, 11726, 11869, 12000];
var chords = ["Major", "Major", "Major", "Major", "Major", "Major", "Major", "Minor", "Minor", "Minor", "Minor", "Minor", "Minor", "Minor", "Diminished", "Diminished", "Diminished", "Diminished", "Diminished", "Diminished", "Diminished", "Augmented", "Augmented", "Augmented", "Augmented", "Augmented", "Augmented", "Augmented", "Sus 2nd", "Sus 2nd", "Sus 2nd", "Sus 2nd", "Sus 2nd", "Sus 2nd", "Sus 2nd", "Sus 4th", "Sus 4th", "Sus 4th", "Sus 4th", "Sus 4th", "Sus 4th", "Sus 4th", "7th Sus 2nd", "7th Sus 2nd", "7th Sus 2nd", "7th Sus 2nd", "7th Sus 2nd", "7th Sus 2nd", "7th Sus 2nd", "7th Sus 4th", "7th Sus 4th", "7th Sus 4th", "7th Sus 4th", "7th Sus 4th", "7th Sus 4th", "7th Sus 4th", "6th", "6th", "6th", "6th", "6th", "6th", "6th", "7th", "7th", "7th", "7th", "7th", "7th", "7th", "9th", "9th", "9th", "9th", "9th", "9th", "9th", "Major 7th", "Major 7th", "Major 7th", "Major 7th", "Major 7th", "Major 7th", "Major 7th", "Major 9th", "Major 9th", "Major 9th", "Major 9th", "Major 9th", "Major 9th", "Major 9th", "Major 11th", "Major 11th", "Major 11th", "Major 11th", "Major 11th", "Major 11th", "Major 11th", "Minor 6th", "Minor 6th", "Minor 6th", "Minor 6th", "Minor 6th", "Minor 6th", "Minor 6th", "Minor 7th", "Minor 7th", "Minor 7th", "Minor 7th", "Minor 7th", "Minor 7th", "Minor 7th", "Minor 9th", "Minor 9th", "Minor 9th", "Minor 9th", "Minor 9th", "Minor 9th", "Minor 9th", "Minor 11th", "Minor 11th", "Minor 11th", "Minor 11th", "Minor 11th", "Minor 11th", "Minor 11th", "All 12", "All 12"];
var tempo = ["1/32", "1/32", "1/32", "1/32", "1/32", "1/32", "1/32", "1/32", "3/64", "3/64", "3/64", "3/64", "3/64", "3/64", "3/64", "3/64", "1/16", "1/16", "1/16", "1/16", "1/16", "1/16", "1/16", "1/16", "3/32", "3/32", "3/32", "3/32", "3/32", "3/32", "3/32", "3/32", "1/8", "1/8", "1/8", "1/8", "1/8", "1/8", "1/8", "1/8", "3/16", "3/16", "3/16", "3/16", "3/16", "3/16", "3/16", "3/16", "1/4", "1/4", "1/4", "1/4", "1/4", "1/4", "1/4", "1/4", "3/8", "3/8", "3/8", "3/8", "3/8", "3/8", "3/8", "3/8", "1/2", "1/2", "1/2", "1/2", "1/2", "1/2", "1/2", "1/2", "3/4", "3/4", "3/4", "3/4", "3/4", "3/4", "3/4", "3/4", "1", "1", "1", "1", "1", "1", "1", "1", "3/2", "3/2", "3/2", "3/2", "3/2", "3/2", "3/2", "3/2", "2", "2", "2", "2", "2", "2", "2", "2", "3", "3", "3", "3", "3", "3", "3", "3", "4", "4", "4", "4", "4", "4", "4", "4", "6", "6", "6", "6", "6", "6", "6", "6"];

function pitchToVal(string) {
    return pitches.indexOf(string);
}
function valToPitch(value) {
    return pitches[value];
}

function addknob(name, type, value, top, left) {
    var knob = pureknob.createKnob(50, 50);
    knob.setProperty('angleStart', -0.75 * Math.PI);
    knob.setProperty('angleEnd', 0.75 * Math.PI);
    knob.setProperty('colorFG', '#88ff88');

    if (type == 'pitch') {
        knob.setProperty('fnStringToValue', pitchToVal);
        knob.setProperty('fnValueToString', valToPitch);
        knob.setProperty('valMin', 0);
        knob.setProperty('valMax', 26);
        knob.setValue(pitchToVal(value));
    } else if (type == 's') {
        knob.setProperty('valMin', 0);
        knob.setProperty('valMax', 12000);
        knob.setValue(value);
    } else if (type == 'linearcenter') {
        knob.setProperty('fnStringToValue', function(string) { return parseFloar(string)*100; });
        knob.setProperty('fnValueToString', function(value) { return (value/100) });
        knob.setProperty('valMin', -100);
        knob.setProperty('valMax', 100);
        knob.setValue(value*100);
    } else if (type == 'detune') {
        knob.setProperty('fnStringToValue', function(string) { return oscAwf.indexOf(string); });
        knob.setProperty('fnValueToString', function(value) { return (value/100) + "%" });
        knob.setProperty('valMin', 0);
        knob.setProperty('valMax', 600);
        knob.setValue((1-value)*100);
    } else if (type == 'oA') {
        knob.setProperty('fnStringToValue', function(string) { return oscAwf.indexOf(string); });
        knob.setProperty('fnValueToString', function(value) { return oscAwf[value]; });
        knob.setProperty('valMin', 0);
        knob.setProperty('valMax', 7);
        knob.setValue(oscAwf.indexOf(value));
    } else if (type == 'oB') {
        knob.setProperty('fnStringToValue', function(string) { return oscAwf.indexOf(string); });
        knob.setProperty('fnValueToString', function(value) { return oscAwf[value]; });
        knob.setProperty('valMin', 0);
        knob.setProperty('valMax', 8);
        knob.setValue(oscBwf.indexOf(value));
    } else if (type == 'lfo') {
        knob.setProperty('fnStringToValue', function(string) { return lfowf.indexOf(string); });
        knob.setProperty('fnValueToString', function(value) { return lfowf[value]; });
        knob.setProperty('valMin', 0);
        knob.setProperty('valMax', 5);
        knob.setValue(lfowf.indexOf(value));
    } else if (type == 'ff') {
        knob.setProperty('fnStringToValue', function(string) { return filterfreqs.indexOf(string); });
        knob.setProperty('fnValueToString', function(value) { return filterfreqs[value]; });
        knob.setProperty('valMin', 0);
        knob.setProperty('valMax', 255);
        knob.setValue(filterfreqs.indexOf(value));
    } else if (type == 'fr') {
        knob.setProperty('fnStringToValue', function(string) { return Math.Round(parseInt(string)*100); });
        knob.setProperty('fnValueToString', function(value) { return "" + (value/100); });
        knob.setProperty('valMin', 110);
        knob.setProperty('valMax', 1500);
        knob.setValue(Math.round(value*100));
    } else if (type == 'cd') {
        knob.setProperty('fnStringToValue', function(string) { return chords.indexOf(string); });
        knob.setProperty('fnValueToString', function(value) { return chords[value]; });
        knob.setProperty('valMin', 0);
        knob.setProperty('valMax', 127);
        knob.setValue(value);
    } else if (type == 'lforate') {
        knob.setProperty('fnStringToValue', function(string) { return Math.Round(parseInt(string)); });
        knob.setProperty('fnValueToString', function(value) { return (value/100) + "Hz" });
        knob.setProperty('valMin', 0);
        knob.setProperty('valMax', 4000);
        knob.setValue(value);
    } else if (type == 'lfodiv') {
        knob.setProperty('fnStringToValue', function(string) { return tempo.indexOf(value); });
        knob.setProperty('fnValueToString', function(value) { return tempo[value] });
        knob.setProperty('valMin', 0);
        knob.setProperty('valMax', 127);
        knob.setValue(tempo.indexOf(value));
    } else if (type == 'fx') {
        knob.setProperty('fnStringToValue', function(string) { return parseFloat(string) * 10 });
        knob.setProperty('fnValueToString', function(value) { return (value/10) + "Hz" });
        knob.setProperty('valMin', 20);
        knob.setProperty('valMax', 200);
        knob.setValue(value*10);
    } else if (type == 'i') {
        knob.setProperty('valMin', 0);
        knob.setProperty('valMax', 127);
        knob.setValue(value);
    } else {
        knob.setProperty('valMin', 0);
        knob.setProperty('valMax', 100);
        knob.setValue(value);
    }
    
    node = knob.node();
    node.style.position = 'absolute';
    node.style.top = top + 'px';
    node.style.left = left + 'px';
    document.getElementById("tsynth").appendChild(node);
}
