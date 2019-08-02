package com.saskaitos.saskaitufakturuvaldymas.controller;

import com.saskaitos.saskaitufakturuvaldymas.model.Invoice;
import com.saskaitos.saskaitufakturuvaldymas.model.Item;
import com.saskaitos.saskaitufakturuvaldymas.service.InvoiceService;
import com.saskaitos.saskaitufakturuvaldymas.service.ItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoice")
@CrossOrigin
public class InvoiceController {

    private final InvoiceService invoiceService;
    private final ItemService itemService;

    public InvoiceController(InvoiceService invoiceService, ItemService itemService) {
        this.invoiceService = invoiceService;
        this.itemService = itemService;
    }

    @GetMapping
    public List<Invoice> getAllInvoices(){
        return invoiceService.getInvoicesList();
    }

    @GetMapping(path = "/{invoiceId}")
    public Invoice getInvoiceById(@PathVariable Long invoiceId){
        return invoiceService.getInvoiceById(invoiceId);
    }

    @DeleteMapping(path = "/{invoiceId}")
    public void deleteInvoice(@PathVariable Long invoiceId){
        invoiceService.deleteInvoiceById(invoiceId);
    }

    @DeleteMapping(path = "/{invoiceId}/{itemId}")
    public void deleteItem(@PathVariable Long invoiceId, @PathVariable Long itemId){
        Invoice invoice = invoiceService.getInvoiceById(invoiceId);
        Item item = itemService.getItemById(itemId);
        if (item != null && invoiceService.getInvoicesList().contains(invoice)){
            itemService.deleteItem(itemId);
            System.out.println("Deleting item with number Id: " + itemId);
        } else System.out.println("Failure to delete item: " + itemId + "\n" +
                ", from selected invoice: " + invoice);

    }

    @PostMapping(path = "/{invoiceId}")
    public void addItem(@PathVariable Long invoiceId, @RequestBody Item item){
        Invoice invoice = invoiceService.getInvoiceById(invoiceId);
        itemService.addItem(item, invoice);
    }

    @PostMapping
    public void addInvoice(@RequestBody Invoice invoice){
        invoiceService.createInvoice(invoice);
    }

    @PutMapping
    public void editInvoice(@RequestBody Invoice invoice){
        invoiceService.createInvoice(invoice);
    }

}
