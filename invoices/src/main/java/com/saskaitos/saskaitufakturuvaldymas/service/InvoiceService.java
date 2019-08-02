package com.saskaitos.saskaitufakturuvaldymas.service;

import com.saskaitos.saskaitufakturuvaldymas.model.Invoice;

import java.util.List;

public interface InvoiceService {

    void deleteInvoiceById(Long id);
    void createInvoice(Invoice invoice);
    List<Invoice> getInvoicesList();
    Invoice getInvoiceById(Long id);
}
