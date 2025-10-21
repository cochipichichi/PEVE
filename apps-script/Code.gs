/**
 * Plataforma Exámenes de Validación de Estudios — Backend (Google Apps Script)
 * Hoja de cálculo recomendada: "PEVE_Datos"
 * Pestañas usadas: quiz, ticket, users
 */

const ALLOWED_ORIGINS = [
  'http://localhost',
  'http://127.0.0.1',
  // Agrega aquí tu dominio productivo:
  'https://panchopinto.github.io',
  'https://educacioninmversiva.cl'
];

function _corsHeaders_() {
  const origin = (typeof e !== 'undefined' && e?.parameter?.origin) || '';
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}

function doOptions(e){
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders(_corsHeaders_());
}

function doPost(e){
  const headers = _corsHeaders_();
  try{
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    const payload = data.payload || {};
    const ss = _open_();
    let out = {};

    if(action === 'quiz_submit'){
      const sh = _sheet_(ss, 'quiz', ['timestamp','userId','userName','course','module','score','max','q1','q2']);
      sh.appendRow([payload.timestamp, payload.userId, payload.userName, payload.course, payload.module, payload.score, payload.max, payload.q1, payload.q2]);
      out = {status:'ok'};
    }
    else if(action === 'ticket_submit'){
      const sh = _sheet_(ss, 'ticket', ['timestamp','userId','userName','course','module','learned','doubt','example']);
      sh.appendRow([payload.timestamp, payload.userId, payload.userName, payload.course, payload.module, payload.learned, payload.doubt, payload.example]);
      out = {status:'ok'};
    }
    else if(action === 'user_create'){
      const sh = _sheet_(ss, 'users', ['id','name','role','email']);
      sh.appendRow([payload.id, payload.name, payload.role, payload.email]);
      out = {status:'ok', message:'Usuario creado'};
    }
    else if(action === 'user_list'){
      const sh = _sheet_(ss, 'users', ['id','name','role','email']);
      const values = sh.getDataRange().getValues();
      const head = values.shift();
      const rows = values.map(r=>({id:r[0],name:r[1],role:r[2],email:r[3]}));
      out = {status:'ok', rows};
    }
    else {
      out = {status:'error', message:'Acción no soportada'};
    }

    return ContentService.createTextOutput(JSON.stringify(out))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
  }catch(err){
    const out = {status:'error', message:String(err)};
    return ContentService.createTextOutput(JSON.stringify(out))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
  }
}

function _open_(){
  // Crea o abre la hoja "PEVE_Datos" en tu Google Drive
  const name = 'PEVE_Datos';
  const files = DriveApp.getFilesByName(name);
  if(files.hasNext()){
    const file = files.next();
    return SpreadsheetApp.open(file);
  }
  const ss = SpreadsheetApp.create(name);
  return ss;
}

function _sheet_(ss, name, headers){
  let sh = ss.getSheetByName(name);
  if(!sh){ sh = ss.insertSheet(name); sh.appendRow(headers); }
  return sh;
}
