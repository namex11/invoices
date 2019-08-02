package com.saskaitos.saskaitufakturuvaldymas.service;

import com.saskaitos.saskaitufakturuvaldymas.model.Invoice;
import com.saskaitos.saskaitufakturuvaldymas.repository.InvoiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;

    public InvoiceServiceImpl(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    private Invoice findInvoiceById(long id){
        for (Invoice invoice : getInvoicesList()) {
            if (invoice.getId() == id) {
                return invoice;
            }
        }
        return null;
    }


    @Override
    public void deleteInvoiceById(Long id) {
        invoiceRepository.deleteById(id);
    }

    @Override
    public void createInvoice(Invoice invoice) {
        invoiceRepository.save(invoice);
    }

    @Override
    public List<Invoice> getInvoicesList() {
        return invoiceRepository.findAll();
    }

    @Override
    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.getOne(id);
    }

}
