const { Given , Then , When } = require ('cucumber');
const assert = require ( 'assert' );

var button;

Given('The list of contacts to delete is displayed', function (callback) {
    this.browser.visit ("/" ,(err) => {
        if (err) throw err ;
        assert.ok (this.browser.success, 'page loaded');
        assert.equal (this.browser.text('th#cellFirstName'),'First name');
        assert.equal (this.browser.text('th#cellLastName'),'Last name');
        assert.equal (this.browser.text('th#cellPhones'),'Phones');
        assert.equal (this.browser.text('th#cellMails'),'Mails');
        assert.equal (this.browser.text('th#cellTags'),'Tags');
        var ContactList = this.browser.tabs.current.Contact;
        var ContactList = ContactList.Contacts.instance().iterator();
        var i = 0;
        while (ContactList.hasNext()){
            var contact = ContactList.next();
            assert.equal(this.browser.queryAll('td#cellFirstName')[i].innerHTML, contact.firstName());
            assert.equal(this.browser.queryAll('td#cellLastName')[i].innerHTML, contact.lastName());
            i++;
        }
        callback ();
    });

});

When('User clicks on remove button of the first contact', function (callback) {
    var ContactList = this.browser.tabs.current.Contact;
    var ContactList = ContactList.Contacts.instance().iterator();
    button = "#button_" + ContactList.first().id();
    this.browser.query(button).click();
    callback();
});

Then('The first contact is removed', function (callback) {
    var ContactList = this.browser.tabs.current.Contact;
    var ContactList = ContactList.Contacts.instance().iterator();
    var buttonsecond = "#button_" + ContactList.first().id();
    assert.notEqual(button,buttonsecond);
    callback();
});

