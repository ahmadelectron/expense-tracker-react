import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTransaction } from "../../store/transactionSlice";
import * as XLSX from "xlsx";
import Button from "../Button/Button";
import "./ExportData.scss";

const ExportData = () => {
  const transactions = useSelector((state) => state.transactions.list);
  const dispatch = useDispatch();

  // Excel data export
  const exportToExcel = () => {
    if (transactions.length === 0) {
      alert("تراکنشی برای خروجی گرفتن وجود ندارد!");
      return;
    }

    // Preparing dato to export
    const dataToExport = transactions.map((t) => ({
      عنوان: t.title,
      "مبلغ (تومان)": t.amount,
      نوع: t.type === "income" ? "درآمد" : "هزینه",
      دسته‌بندی: t.category,
      تاریخ: t.date,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    // Download file
    XLSX.writeFile(workbook, "my-expenses-report.xlsx");
  };

  // Excel data import
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const workbook = XLSX.read(bstr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        if (data.length === 0) {
          alert("فایل انتخاب شده خالی است!");
          return;
        }

        // adding data to redux
        data.forEach((item) => {
          dispatch(
            addTransaction({
              title: item["عنوان"] || item.title || "بدون عنوان",
              amount: Number(item["مبلغ (تومان)"] || item.amount || 0),
              type:
                item["نوع"] === "درآمد" || item.type === "income"
                  ? "income"
                  : "expense",
              category: item["دسته‌بندی"] || item.category || "سایر",
              date:
                item["تاریخ"] ||
                item.date ||
                new Date().toLocaleDateString("fa-IR"),
              id: Date.now() + Math.random(), // ایجاد آیدی منحصربه‌فرد
            }),
          );
        });

        alert(`${data.length} تراکنش با موفقیت وارد شد.`);
        e.target.value = null; 
      } catch (error) {
        alert("خطا در پردازش فایل! لطفا از فرمت صحیح اکسل استفاده کنید.");
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="export-sidebar-wrapper">
      <div className="section-group">
        <h4>خروجی گرفتن</h4>
        <Button
          onClick={exportToExcel}
          variant="primary"
          className="full-width-btn"
        >
          📥 دانلود لیست (Excel)
        </Button>
      </div>

      <hr className="divider" />

      <div className="section-group">
        <h4>وارد کردن داده‌ها</h4>
        <div className="import-zone">
          <label htmlFor="import-excel" className="import-label">
            <div className="upload-icon">📂</div>
            <span>انتخاب فایل اکسل</span>
            <small>فرمت‌های xlsx, csv</small>
          </label>
          <input
            id="import-excel"
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleImport}
          />
        </div>
      </div>
    </div>
  );
