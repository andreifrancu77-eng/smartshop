package com.backend.smartshop.service;

import com.backend.smartshop.domain.Product;
import com.backend.smartshop.dto.ProductDTO;
import com.backend.smartshop.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository repository;

    public List<ProductDTO> getAllProducts() {
        return repository.findAll().stream()
                .map(ProductDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public Product createProduct(Product product) {
        return repository.save(product);
    }

    public ProductDTO getProductById(Long id) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return ProductDTO.fromEntity(product);
    }

    public List<ProductDTO> getProductsByCategory(Long categoryId) {
        return repository.findByCategoryId(categoryId).stream()
                .map(ProductDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getProductsByBrand(Long brandId) {
        return repository.findByBrandId(brandId).stream()
                .map(ProductDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> searchProducts(String query) {
        return repository.searchProducts(query).stream()
                .map(ProductDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public Product updateProduct(Long id, Product productDetails) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setStock(productDetails.getStock());
        product.setImageUrl(productDetails.getImageUrl());
        product.setCategory(productDetails.getCategory());
        product.setBrand(productDetails.getBrand());

        return repository.save(product);
    }

    public void deleteProduct(Long id) {
        repository.deleteById(id);
    }
}
