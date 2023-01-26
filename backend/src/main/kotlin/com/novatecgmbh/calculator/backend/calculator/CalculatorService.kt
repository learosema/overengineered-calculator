package com.novatecgmbh.calculator.backend.calculator

import org.springframework.stereotype.Service

@Service
class CalculatorService {

    fun add(a: Double, b: Double) = CalculatorResult(a + b)

    fun divide(a: Double, b: Double) = CalculatorResult(a / b)

    fun subtract(a: Double, b: Double) = CalculatorResult(a - b)

    fun multiply(a: Double, b: Double) = CalculatorResult(a * b)

}