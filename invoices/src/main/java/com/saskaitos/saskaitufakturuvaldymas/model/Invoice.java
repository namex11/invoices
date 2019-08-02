package com.saskaitos.saskaitufakturuvaldymas.model;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
public class Invoice {

    @Id
    @GeneratedValue
    private Long id;
    private long number;
    @CreationTimestamp
    private LocalDate creationDate;
    private String prescribedCompany;
    private String receiver;

//    @ManyToMany
//    @JoinTable(
//            name = "invoice_item",
//            joinColumns = @JoinColumn(name = "invoice_id"),
//            inverseJoinColumns = @JoinColumn(name = "item_id")
//    )
    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL)
    private List<Item> items;

    public Invoice(){}

    public Invoice(long number, String prescribedCompany, String receiver) {
        this.number = number;
        this.prescribedCompany = prescribedCompany;
        this.receiver = receiver;
    }

}
