package com.novatecgmbh.calculator.backend.calculator

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1")
class CalculatorController(
    private val calculatorService: CalculatorService
) {

    @GetMapping("/add")
    fun getAdd(
        @RequestParam a: Double,
        @RequestParam b: Double,
    ) = ResponseEntity.ok(calculatorService.add(a, b))

    @GetMapping("/sub")
    fun getSub(
        @RequestParam a: Double,
        @RequestParam b: Double,
    ) = ResponseEntity.ok(calculatorService.subtract(a, b))

    @GetMapping("/div")
    fun getDiv(
        @RequestParam a: Double,
        @RequestParam b: Double,
    ) = ResponseEntity.ok(calculatorService.divide(a, b))

    @GetMapping("/mul")
    fun getMul(
        @RequestParam a: Double,
        @RequestParam b: Double,
    ) = ResponseEntity.ok(calculatorService.multiply(a, b))


}