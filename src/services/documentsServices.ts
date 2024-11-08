import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import LibreOfficeConvert from 'libreoffice-convert';
import path from 'path';
import PizZip from 'pizzip';
import util from 'util';

const convertAsync = util.promisify(LibreOfficeConvert.convert);

export const convertToPdf = async (docName: string) =>{

  const content = fs.readFileSync(
    path.resolve(`./src/uploads/${docName}`),
    "binary"
  );

  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.render({
    num_cliente: "aaaaa",
    quote: "ABCDEF",
    hasObligado: false,
    obligado: "Jon Snow",
  });

  const buf = doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
  });

  console.log(buf)

  const pdf = await convertAsync(buf, ".pdf", undefined);
  await fs.writeFileSync("./src/pdf/demo.pdf", pdf);
  const data = await fs.readFileSync("./src/pdf/demo.pdf");
  console.log(data)
  return data;
}