import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import * as XLSX from 'xlsx';
interface President { Name: string; Index: number };
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'work-time-design-ui';

  rows: President[] = [ { Name: "SheetJS", Index: 0 }];

  // ngOnInit(): void { (async() => {
  //   /* Download from https://sheetjs.com/pres.numbers */
  //   const f = await fetch("https://sheetjs.com/pres.numbers");
  //   const ab = await f.arrayBuffer();

  //   /* parse workbook */
  //   const wb = read(ab);

  //   /* update data */
  //   this.rows = utils.sheet_to_json<President>(wb.Sheets[wb.SheetNames[0]]);

  // })(); }

  onCange(event: any): void {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, {header: 1});
      console.log(data);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  // onSave(): void {
  //   const ws = utils.json_to_sheet(this.rows);
  //   const wb = utils.book_new();
  //   utils.book_append_sheet(wb, ws, "Data");
  //   writeFileXLSX(wb, "SheetJSAngularAoO.xlsx");
  // }
}
