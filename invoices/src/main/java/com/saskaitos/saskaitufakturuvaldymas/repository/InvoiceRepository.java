package com.saskaitos.saskaitufakturuvaldymas.repository;

import com.saskaitos.saskaitufakturuvaldymas.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

}
