package com.saskaitos.saskaitufakturuvaldymas.repository;

import com.saskaitos.saskaitufakturuvaldymas.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
