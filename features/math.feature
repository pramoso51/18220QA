Feature: Cucumber Mathematics

  # Escenario 1: Simple subtraction
  Scenario: Let’s eat cucumbers!
    Given I have 5 cucumbers
    When I eat 4 cucumbers
    Then I have 1 cucumber

  # Escenario 2: Subtraction with a negative result
  Scenario: Let’s eat carrots!
    Given I have 10 carrots
    When I eat 12 carrots
    Then I have -2 carrots

  # Escenario 3: Use of multiple variables and statements
  Scenario: Let’s make a salad!
    Given I have 8 cucumbers
    And I have 5 carrots
    When I make a salad with 3 cucumbers and 2 carrots
    Then I have 5 cucumbers
    And I have 3 carrots
    And I have 1 salad