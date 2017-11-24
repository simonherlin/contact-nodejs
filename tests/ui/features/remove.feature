Feature: User can remove the first contact
  As a user

  Scenario: User remove the first contact
    Given The list of contacts to delete is displayed
    When User clicks on remove button of the first contact
    Then The first contact is removed