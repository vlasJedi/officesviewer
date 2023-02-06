@org.hibernate.annotations.GenericGenerator(
        name = "ID_GENERATOR",
        // database provided sequence or hibernate creates own table for sequence
        // id will available for entity before writing to db
        // regular GenerationStrategy.Identity provides id only after insertion
        strategy = "enhanced-sequence",
        parameters = {@org.hibernate.annotations.Parameter(
                name = "sequence_name",
                value = "JPWH_SEQUENCE"),
                @org.hibernate.annotations.Parameter(
                        name = "initial_value",
                        value = "1000")
        })
package com.lux.viewer.jpahibernate.models;

