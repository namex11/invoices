package com.saskaitos.saskaitufakturuvaldymas.service;

import com.saskaitos.saskaitufakturuvaldymas.model.Invoice;
import com.saskaitos.saskaitufakturuvaldymas.model.Item;

public interface ItemService {
    void deleteItem(Long id);
    void addItem(Item item, Invoice invoice);
    Item getItemById(Long id);
}
