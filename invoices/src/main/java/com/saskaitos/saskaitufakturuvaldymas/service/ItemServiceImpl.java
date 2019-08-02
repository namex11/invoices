package com.saskaitos.saskaitufakturuvaldymas.service;

import com.saskaitos.saskaitufakturuvaldymas.model.Invoice;
import com.saskaitos.saskaitufakturuvaldymas.model.Item;
import com.saskaitos.saskaitufakturuvaldymas.repository.ItemRepository;
import org.springframework.stereotype.Service;

@Service
public class ItemServiceImpl implements ItemService {

    ItemRepository itemRepository;

    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }

    @Override
    public void addItem(Item item, Invoice invoice) {
        item.setInvoice(invoice);
        itemRepository.save(item);
    }

    @Override
    public Item getItemById(Long id) {
        return itemRepository.getOne(id);
    }
}
