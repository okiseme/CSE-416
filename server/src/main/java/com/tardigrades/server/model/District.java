package com.tardigrades.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class District {
    private int districtNumber;
    private Demographics demographics;
    private List<Representative> representatives;
    private int seats;
    private Object votingResults;
    private boolean MMD;
    private boolean opportunityDistrict;
}
