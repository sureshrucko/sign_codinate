import { PageSizes, PDFDocument, RotationTypes, StandardFonts } from 'pdf-lib'
import * as fs from 'fs'

async function main() {
    // const mainDoc = await getDoc('F:\\Downloads\\Test Sanction Letter.pdf');
    const mainDoc = await getDoc('./input.pdf');
    // const mainDoc = await getDoc('F:\\Downloads\\BoE_ACompliance559_07122022_4.pdf');
    const font = await mainDoc.embedFont(StandardFonts.Helvetica);
    const signs = [
        {
            t: 'sign 1',
            x: 40,
            y: 375
        },
        {
            t: 'sign 2',
            x: 400,
            y: 475
        },
        {
            t: 'sign 3',
            x: 90,
            y: 580
        },
        {
            t: 'left end corner',
            x: 10,
            y: 10
        },
        {
            t: 'right end corner',
            x: 450,
            y: 10
        },
        {
            t: 'Svc signature',
            x: 85,
            y: 460
        },
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
    ]

    

    mainDoc.getPages().forEach(a => {
        const size = a.getSize()
        console.log(size);
        signs.forEach(b => {
            let x = typeof b.x === 'string' ? getPercentile(b.x, size.width) : (b.x < 0 ? size.width + b.x : b.x);
            let y = typeof b.y === 'string' ? getPercentile(b.y, size.height) : (b.y < 0 ? size.height + b.y : b.y);
            console.log(x, y)
            a.drawText(b.t, {
                x: x,
                y: y,
                // size: b.size ?? undefined,
                font: font
            })
        })
    })

    const newDoc = await mainDoc.save()
    await fs.writeFileSync('output.pdf', newDoc);
}

async function getDoc(path: string) {
    const uint8Array = fs.readFileSync(path)
    const pdfDoc = await PDFDocument.load(uint8Array, {
        updateMetadata: false,
    })
    return pdfDoc;
}

function getPercentile(per: string, total: number): number {
    per = per.replace('%', '');
    const count = parseInt(per, 10);
    const part = total * Math.abs(count) / 100;
    console.log(count, part, per);
    return Math.round(count < 0 ? total - part : part);
}

main()
