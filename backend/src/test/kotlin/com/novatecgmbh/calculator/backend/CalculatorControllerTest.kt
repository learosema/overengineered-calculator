package com.novatecgmbh.calculator.backend

import jdk.jfr.ContentType
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.HttpStatus
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get

@SpringBootTest
@AutoConfigureMockMvc
internal class CalculatorControllerTest(
    @Autowired val mockMvc: MockMvc
) {

    @Test
    fun `add route should return the sum of 2 numbers`() {
        mockMvc.get("/api/v1/add?a=1&b=1")
            .andDo { print() }
            .andExpect {
                content {
                    contentType("application/json")
                    string("{\"result\":2.0}")
                }
            }
    }

    @Test
    fun `sub route should return the subtraction of 2 numbers`() {
        mockMvc.get("/api/v1/sub?a=2&b=3")
            .andDo { print() }
            .andExpect {
                content {
                    contentType("application/json")
                    string("{\"result\":-1.0}")
                }
            }
    }

    @Test
    fun `mul route should return the multiplication of 2 numbers`() {
        mockMvc.get("/api/v1/mul?a=2&b=3")
            .andDo { print() }
            .andExpect {
                status { HttpStatus.OK }
                content {
                    contentType("application/json")
                    string("{\"result\":6.0}")
                }
            }
    }

    @Test
    fun `div route should return the division of 2 numbers`() {
        mockMvc.get("/api/v1/div?a=5&b=2")
            .andDo { print() }
            .andExpect {
                status { HttpStatus.OK }
                content {
                    contentType("application/json")
                    string("{\"result\":2.5}")
                }
            }
    }

}