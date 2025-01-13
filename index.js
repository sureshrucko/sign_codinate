"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var pdf_lib_1 = require("pdf-lib");
var fs = require("fs");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var mainDoc, font, signs, newDoc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getDoc('./test.pdf')];
                case 1:
                    mainDoc = _a.sent();
                    return [4 /*yield*/, mainDoc.embedFont(pdf_lib_1.StandardFonts.Helvetica)];
                case 2:
                    font = _a.sent();
                    signs = [
                        {
                            t: 'sign 1',
                            x: 40,
                            y: 380
                        },
                        {
                            t: 'sign 2',
                            x: 400,
                            y: 475
                        },
                        // {
                        //     t: 'sign 3',
                        //     x: 340,
                        //     y: 137
                        // },
                        // {
                        //     t: 'sign 4',
                        //     x: 485,
                        //     y: 137
                        // },
                        // {
                        //     t: 'Stamp Duty Challan Reference No. - MH003947861202223E1',
                        //     x: -Math.round(font.widthOfTextAtSize('Stamp Duty Challan Reference No. - MH003947861202223E1', 8) + 10),
                        //     y: -Math.round(font.heightAtSize(8) + 10),
                        //     size: 8
                        // },
                        // {
                        //     t: 'MH003947861202223E1',
                        //     x: -Math.round(font.widthOfTextAtSize('MH003947861202223E1', 8) + 9),
                        //     y: -Math.round(font.heightAtSize(8)*2 + 10),
                        //     size: 8
                        // },
                    ];
                    mainDoc.getPages().forEach(function (a) {
                        var size = a.getSize();
                        console.log(size);
                        signs.forEach(function (b) {
                            var x = typeof b.x === 'string' ? getPercentile(b.x, size.width) : (b.x < 0 ? size.width + b.x : b.x);
                            var y = typeof b.y === 'string' ? getPercentile(b.y, size.height) : (b.y < 0 ? size.height + b.y : b.y);
                            console.log(x, y);
                            a.drawText(b.t, {
                                x: x,
                                y: y,
                                // size: b.size ?? undefined,
                                font: font
                            });
                        });
                    });
                    return [4 /*yield*/, mainDoc.save()];
                case 3:
                    newDoc = _a.sent();
                    return [4 /*yield*/, fs.writeFileSync('test.pdf', newDoc)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getDoc(path) {
    return __awaiter(this, void 0, void 0, function () {
        var uint8Array, pdfDoc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uint8Array = fs.readFileSync(path);
                    return [4 /*yield*/, pdf_lib_1.PDFDocument.load(uint8Array, {
                            updateMetadata: false
                        })];
                case 1:
                    pdfDoc = _a.sent();
                    return [2 /*return*/, pdfDoc];
            }
        });
    });
}
function getPercentile(per, total) {
    per = per.replace('%', '');
    var count = parseInt(per, 10);
    var part = total * Math.abs(count) / 100;
    console.log(count, part, per);
    return Math.round(count < 0 ? total - part : part);
}
main();
