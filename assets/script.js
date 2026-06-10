
function openWhatsApp(){document.getElementById('waModal').classList.add('show')}
function closeWhatsApp(){document.getElementById('waModal').classList.remove('show')}
function saveContact(){
 const vcard=`BEGIN:VCARD
VERSION:3.0
FN:Coldway Comforts
ORG:Coldway Comforts
TEL;TYPE=CELL:+91 98192 13075
TEL;TYPE=CELL:+91 96534 65441
EMAIL:ccoldwaycomforts@gmail.com
ADR;TYPE=WORK:;;Unit No. 60, Plot No. 7, New Tank, Bandar Road, Darukhana, Mazgaon, Mumbai - 400 010
END:VCARD`;
 const blob=new Blob([vcard],{type:'text/vcard'}); const url=URL.createObjectURL(blob); const a=document.createElement('a');
 a.href=url; a.download='Coldway-Comforts.vcf'; a.click(); URL.revokeObjectURL(url);
}
