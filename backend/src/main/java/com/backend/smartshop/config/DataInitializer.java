package com.backend.smartshop.config;

import com.backend.smartshop.domain.*;
import com.backend.smartshop.repository.BrandRepository;
import com.backend.smartshop.repository.CategoryRepository;
import com.backend.smartshop.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;
    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        if (categoryRepository.count() == 0) {
            log.info("Initializing database with sample smartphone data...");
            initializeData();
            log.info("Database initialization completed!");
        } else {
            log.info("Database already contains data. Skipping initialization.");
        }
    }

    private void initializeData() {
        // Create Categories
        Category smartphones = Category.builder()
                .name("Smartphones")
                .description("Telefoane mobile de ultimă generație")
                .iconName("Smartphone")
                .build();
        Category tablets = Category.builder()
                .name("Tablete")
                .description("Tablete pentru productivitate și divertisment")
                .iconName("Tablet")
                .build();
        Category accessories = Category.builder()
                .name("Accesorii")
                .description("Huse, încărcătoare și alte accesorii")
                .iconName("Headphones")
                .build();
        Category wearables = Category.builder()
                .name("Wearables")
                .description("Ceasuri inteligente și dispozitive purtabile")
                .iconName("Watch")
                .build();
        Category audio = Category.builder()
                .name("Audio")
                .description("Căști și boxe portabile")
                .iconName("Speaker")
                .build();

        categoryRepository.saveAll(List.of(smartphones, tablets, accessories, wearables, audio));

        // Create Brands
        Brand apple = Brand.builder()
                .name("Apple")
                .logoUrl("/brands/apple.svg")
                .description("Inovație în tehnologie")
                .build();
        Brand samsung = Brand.builder()
                .name("Samsung")
                .logoUrl("/brands/samsung.svg")
                .description("Lider mondial în electronice")
                .build();
        Brand xiaomi = Brand.builder()
                .name("Xiaomi")
                .logoUrl("/brands/xiaomi.svg")
                .description("Tehnologie la prețuri accesibile")
                .build();
        Brand google = Brand.builder()
                .name("Google")
                .logoUrl("/brands/google.svg")
                .description("Experiență Android pură")
                .build();
        Brand oneplus = Brand.builder()
                .name("OnePlus")
                .logoUrl("/brands/oneplus.svg")
                .description("Never Settle")
                .build();

        brandRepository.saveAll(List.of(apple, samsung, xiaomi, google, oneplus));

        // Create Products with Specifications
        createProduct("iPhone 15 Pro Max", "Cel mai avansat iPhone cu chip A17 Pro și cameră de 48MP",
            new BigDecimal("6499.00"), 25, "/products/iphone-15-pro-max.jpg", smartphones, apple,
            createSpec("6.7\"", "Super Retina XDR OLED", "2796x1290", "A17 Pro", "8GB", "256GB",
                "4422mAh", "48MP + 12MP + 12MP", "12MP", "iOS 17", "5G, Wi-Fi 6E, Bluetooth 5.3", "221g", "Titan Negru"));

        createProduct("iPhone 15 Pro", "iPhone Pro cu Dynamic Island și USB-C",
            new BigDecimal("5999.00"), 30, "/products/iphone-15-pro.jpg", smartphones, apple,
            createSpec("6.1\"", "Super Retina XDR OLED", "2556x1179", "A17 Pro", "8GB", "128GB",
                "3274mAh", "48MP + 12MP + 12MP", "12MP", "iOS 17", "5G, Wi-Fi 6E, Bluetooth 5.3", "187g", "Titan Natural"));

        createProduct("iPhone 15", "iPhone cu Dynamic Island și cameră de 48MP",
            new BigDecimal("4499.00"), 40, "/products/iphone-15.jpg", smartphones, apple,
            createSpec("6.1\"", "Super Retina XDR OLED", "2556x1179", "A16 Bionic", "6GB", "128GB",
                "3349mAh", "48MP + 12MP", "12MP", "iOS 17", "5G, Wi-Fi 6, Bluetooth 5.3", "171g", "Roz"));

        createProduct("Samsung Galaxy S24 Ultra", "Cel mai puternic Galaxy cu S Pen inclus",
            new BigDecimal("6299.00"), 20, "/products/galaxy-s24-ultra.jpg", smartphones, samsung,
            createSpec("6.8\"", "Dynamic AMOLED 2X", "3088x1440", "Snapdragon 8 Gen 3", "12GB", "256GB",
                "5000mAh", "200MP + 12MP + 50MP + 10MP", "12MP", "Android 14", "5G, Wi-Fi 7, Bluetooth 5.3", "232g", "Titan Gray"));

        createProduct("Samsung Galaxy S24+", "Galaxy flagship cu ecran mare și cameră AI",
            new BigDecimal("4999.00"), 35, "/products/galaxy-s24-plus.jpg", smartphones, samsung,
            createSpec("6.7\"", "Dynamic AMOLED 2X", "3120x1440", "Exynos 2400", "12GB", "256GB",
                "4900mAh", "50MP + 12MP + 10MP", "12MP", "Android 14", "5G, Wi-Fi 6E, Bluetooth 5.3", "196g", "Violet"));

        createProduct("Samsung Galaxy S24", "Galaxy compact cu performanță flagship",
            new BigDecimal("4199.00"), 45, "/products/galaxy-s24.jpg", smartphones, samsung,
            createSpec("6.2\"", "Dynamic AMOLED 2X", "2340x1080", "Exynos 2400", "8GB", "128GB",
                "4000mAh", "50MP + 12MP + 10MP", "12MP", "Android 14", "5G, Wi-Fi 6E, Bluetooth 5.3", "167g", "Amber Yellow"));

        createProduct("Samsung Galaxy Z Fold5", "Smartphone pliabil premium cu ecran mare",
            new BigDecimal("8499.00"), 15, "/products/galaxy-z-fold5.jpg", smartphones, samsung,
            createSpec("7.6\" (interior)", "Dynamic AMOLED 2X", "2176x1812", "Snapdragon 8 Gen 2", "12GB", "256GB",
                "4400mAh", "50MP + 12MP + 10MP", "10MP + 4MP", "Android 14", "5G, Wi-Fi 6E, Bluetooth 5.3", "253g", "Phantom Black"));

        createProduct("Xiaomi 14 Ultra", "Cameră Leica și performanță extremă",
            new BigDecimal("5799.00"), 18, "/products/xiaomi-14-ultra.jpg", smartphones, xiaomi,
            createSpec("6.73\"", "LTPO AMOLED", "3200x1440", "Snapdragon 8 Gen 3", "16GB", "512GB",
                "5000mAh", "50MP + 50MP + 50MP + 50MP", "32MP", "Android 14", "5G, Wi-Fi 7, Bluetooth 5.4", "219g", "Negru"));

        createProduct("Xiaomi 14", "Flagship compact cu cameră Leica",
            new BigDecimal("4299.00"), 30, "/products/xiaomi-14.jpg", smartphones, xiaomi,
            createSpec("6.36\"", "LTPO AMOLED", "2670x1200", "Snapdragon 8 Gen 3", "12GB", "256GB",
                "4610mAh", "50MP + 50MP + 50MP", "32MP", "Android 14", "5G, Wi-Fi 7, Bluetooth 5.4", "188g", "Alb"));

        createProduct("Xiaomi Redmi Note 13 Pro+", "Cel mai bun raport calitate-preț",
            new BigDecimal("1699.00"), 50, "/products/redmi-note-13-pro.jpg", smartphones, xiaomi,
            createSpec("6.67\"", "AMOLED", "2712x1220", "MediaTek Dimensity 7200", "12GB", "256GB",
                "5000mAh", "200MP + 8MP + 2MP", "16MP", "Android 13", "5G, Wi-Fi 6, Bluetooth 5.2", "204g", "Midnight Black"));

        createProduct("Google Pixel 8 Pro", "Cel mai inteligent telefon Android",
            new BigDecimal("5299.00"), 22, "/products/pixel-8-pro.jpg", smartphones, google,
            createSpec("6.7\"", "LTPO OLED", "2992x1344", "Google Tensor G3", "12GB", "128GB",
                "5050mAh", "50MP + 48MP + 48MP", "10.5MP", "Android 14", "5G, Wi-Fi 7, Bluetooth 5.3", "213g", "Bay"));

        createProduct("Google Pixel 8", "AI avansat în format compact",
            new BigDecimal("3799.00"), 35, "/products/pixel-8.jpg", smartphones, google,
            createSpec("6.2\"", "OLED", "2400x1080", "Google Tensor G3", "8GB", "128GB",
                "4575mAh", "50MP + 12MP", "10.5MP", "Android 14", "5G, Wi-Fi 6E, Bluetooth 5.3", "187g", "Hazel"));

        createProduct("OnePlus 12", "Flagship killer cu încărcare super-rapidă",
            new BigDecimal("4499.00"), 28, "/products/oneplus-12.jpg", smartphones, oneplus,
            createSpec("6.82\"", "LTPO AMOLED", "3168x1440", "Snapdragon 8 Gen 3", "16GB", "256GB",
                "5400mAh", "50MP + 48MP + 64MP", "32MP", "Android 14", "5G, Wi-Fi 7, Bluetooth 5.4", "220g", "Silky Black"));

        createProduct("OnePlus 12R", "Performanță flagship la preț accesibil",
            new BigDecimal("2999.00"), 40, "/products/oneplus-12r.jpg", smartphones, oneplus,
            createSpec("6.78\"", "LTPO AMOLED", "2780x1264", "Snapdragon 8 Gen 2", "16GB", "256GB",
                "5500mAh", "50MP + 8MP + 2MP", "16MP", "Android 14", "5G, Wi-Fi 7, Bluetooth 5.3", "207g", "Iron Gray"));

        // Tablets
        createProduct("iPad Pro 12.9\" M4", "Cel mai puternic iPad cu chip M4",
            new BigDecimal("7999.00"), 12, "/products/ipad-pro-m4.jpg", tablets, apple,
            createSpec("12.9\"", "Liquid Retina XDR", "2732x2048", "Apple M4", "16GB", "256GB",
                "10758mAh", "12MP + 10MP", "12MP", "iPadOS 18", "5G, Wi-Fi 6E, Bluetooth 5.3", "682g", "Space Black"));

        createProduct("Samsung Galaxy Tab S9 Ultra", "Tableta Android premium",
            new BigDecimal("5499.00"), 15, "/products/galaxy-tab-s9-ultra.jpg", tablets, samsung,
            createSpec("14.6\"", "Dynamic AMOLED 2X", "2960x1848", "Snapdragon 8 Gen 2", "12GB", "256GB",
                "11200mAh", "13MP + 8MP", "12MP + 12MP", "Android 14", "5G, Wi-Fi 6E, Bluetooth 5.3", "732g", "Graphite"));

        // Wearables
        createProduct("Apple Watch Ultra 2", "Cel mai rezistent Apple Watch",
            new BigDecimal("4299.00"), 18, "/products/apple-watch-ultra-2.jpg", wearables, apple,
            createSpec("49mm", "OLED Always-On", "502x410", "S9 SiP", "1GB", "64GB",
                "542mAh", "-", "-", "watchOS 10", "GPS, LTE, Bluetooth 5.3", "61.4g", "Titan Natural"));

        createProduct("Samsung Galaxy Watch 6 Classic", "Ceas inteligent cu bezel rotativ",
            new BigDecimal("1899.00"), 25, "/products/galaxy-watch-6-classic.jpg", wearables, samsung,
            createSpec("47mm", "Super AMOLED", "480x480", "Exynos W930", "2GB", "16GB",
                "425mAh", "-", "-", "Wear OS 4", "GPS, LTE, Bluetooth 5.3", "59g", "Argintiu"));

        // Audio
        createProduct("AirPods Pro 2", "Căști premium cu anulare activă a zgomotului",
            new BigDecimal("1299.00"), 50, "/products/airpods-pro-2.jpg", audio, apple,
            createSpec("-", "-", "-", "H2", "-", "-",
                "6h", "-", "-", "-", "Bluetooth 5.3", "5.3g", "Alb"));

        createProduct("Samsung Galaxy Buds2 Pro", "Căști cu sunet Hi-Fi",
            new BigDecimal("899.00"), 40, "/products/galaxy-buds2-pro.jpg", audio, samsung,
            createSpec("-", "-", "-", "-", "-", "-",
                "5h", "-", "-", "-", "Bluetooth 5.3", "5.5g", "Graphite"));

        // Accessories
        createProduct("MagSafe Charger", "Încărcător wireless rapid pentru iPhone",
            new BigDecimal("249.00"), 100, "/products/magsafe-charger.jpg", accessories, apple,
            null);

        createProduct("Samsung 45W Super Fast Charger", "Încărcător rapid USB-C",
            new BigDecimal("199.00"), 80, "/products/samsung-45w-charger.jpg", accessories, samsung,
            null);

        createProduct("Xiaomi 120W HyperCharge", "Cel mai rapid încărcător",
            new BigDecimal("179.00"), 60, "/products/xiaomi-120w-charger.jpg", accessories, xiaomi,
            null);
    }

    private void createProduct(String name, String description, BigDecimal price, int stock,
            String imageUrl, Category category, Brand brand, ProductSpecification spec) {
        Product product = Product.builder()
                .name(name)
                .description(description)
                .price(price)
                .stock(stock)
                .imageUrl(imageUrl)
                .category(category)
                .brand(brand)
                .build();

        if (spec != null) {
            spec.setProduct(product);
            product.setSpecification(spec);
        }

        productRepository.save(product);
    }

    private ProductSpecification createSpec(String screenSize, String screenType, String resolution,
            String processor, String ram, String storage, String battery, String cameraMain,
            String cameraFront, String os, String connectivity, String weight, String color) {
        return ProductSpecification.builder()
                .screenSize(screenSize)
                .screenType(screenType)
                .resolution(resolution)
                .processor(processor)
                .ram(ram)
                .storage(storage)
                .batteryCapacity(battery)
                .cameraMain(cameraMain)
                .cameraFront(cameraFront)
                .osVersion(os)
                .connectivity(connectivity)
                .weight(weight)
                .color(color)
                .build();
    }
}
