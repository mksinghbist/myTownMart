<template>
  <v-file-input
    label="Upload Excel"
    accept=".xlsx,.xls"
    @change="uploadExcel"
    prepend-icon="mdi-file-excel"
  />
</template>

<script setup>
import * as XLSX from "xlsx"

function uploadExcel(file) {
  const reader = new FileReader()

  reader.onload = e => {
    const data = new Uint8Array(e.target.result)
    const workbook = XLSX.read(data, { type: "array" })

    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const json = XLSX.utils.sheet_to_json(sheet)

    console.log("Excel Products", json)
  }

  reader.readAsArrayBuffer(file)
}
</script>
