package com.backend.smartshop.service;

import com.backend.smartshop.domain.Brand;
import com.backend.smartshop.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BrandService {

    private final BrandRepository repository;

    public List<Brand> getAllBrands() {
        return repository.findAll();
    }

    public Brand getBrandById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Brand not found"));
    }

    public Brand createBrand(Brand brand) {
        return repository.save(brand);
    }

    public Brand updateBrand(Long id, Brand brandDetails) {
        Brand brand = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        brand.setName(brandDetails.getName());
        brand.setLogoUrl(brandDetails.getLogoUrl());
        brand.setDescription(brandDetails.getDescription());

        return repository.save(brand);
    }

    public void deleteBrand(Long id) {
        repository.deleteById(id);
    }
}
