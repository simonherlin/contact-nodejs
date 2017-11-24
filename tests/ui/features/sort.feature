Feature: User can sort the contact list by last name
  As a user

  Scenario: User sort the contact list
    Given The list of contacts to sort is displayed
    When User clicks on sort button
    Then The list of contact is sorted by last name