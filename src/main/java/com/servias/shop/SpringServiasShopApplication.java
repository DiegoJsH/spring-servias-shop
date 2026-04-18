package com.servias.shop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.jdbc.autoconfigure.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class SpringServiasShopApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringServiasShopApplication.class, args);
    }

}
