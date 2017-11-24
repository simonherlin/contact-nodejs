const { Given , Then , When } = require ('cucumber');
const assert = require ( 'assert' );

Given('The list of contacts to sort is displayed', function (callback) {
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

When('User clicks on sort button', function (callback) {
    this.browser.query('#button_sort').click();
    callback();
});

Then('The list of contact is sorted by last name', function (callback) {
    var arrayLastName = [], data = this.browser.tabs.current.Contact;
    var iterator = data.Contacts.instance().iterator();
    while (iterator.hasNext()) {
        var contact = iterator.next();
        arrayLastName.push(contact.lastName());
    }
    var sortedArr = arrayLastName.sort();
    assert(this.browser.queryAll('td#cellLastName')[0].innerHTML, sortedArr[0]);
    assert(this.browser.queryAll('td#cellLastName')[1].innerHTML, sortedArr[1]);
    assert(this.browser.queryAll('td#cellLastName')[2].innerHTML, sortedArr[2]);
    callback();
});