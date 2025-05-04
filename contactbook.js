class ContactManager {
    constructor() {
        this.contacts = [];
        this.form = document.getElementById('contactForm');
        this.contactList = document.getElementById('contactList');
        this.searchInput = document.getElementById('searchInput');
        this.downloadBtn = document.getElementById('downloadBtn');

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.searchInput.addEventListener('input', () => this.handleSearch());
        this.downloadBtn.addEventListener('click', () => this.downloadContacts());
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const contact = {
            id: Date.now().toString(),
            category: formData.get('category'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            businessCompany: formData.get('businessCompany'),
            personalContact: formData.get('personalContact'),
            businessContact: formData.get('businessContact'),
            email: formData.get('email'),
            socialNetworkID: formData.get('socialNetworkID'),
            notes: formData.get('notes')
        };

        this.contacts.push(contact);
        this.sortContacts();
        this.renderContacts();
        this.form.reset();
    }

    sortContacts() {
        this.contacts.sort((a, b) => 
            a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase())
        );
    }

    handleSearch() {
        this.renderContacts();
    }

    getFilteredContacts() {
        const searchTerm = this.searchInput.value.toLowerCase();
        return this.contacts.filter(contact => {
            return Object.values(contact).some(value => 
                value.toString().toLowerCase().includes(searchTerm)
            );
        });
    }

    renderContacts() {
        const filteredContacts = this.getFilteredContacts();
        this.contactList.innerHTML = filteredContacts.map(contact => `
            <tr>
                <td>
                    <span class="category-badge ${contact.category.toLowerCase()}">
                        ${contact.category}
                    </span>
                </td>
                <td>${contact.firstName}</td>
                <td>${contact.lastName}</td>
                <td>${contact.businessCompany}</td>
                <td>${contact.personalContact}</td>
                <td>${contact.businessContact}</td>
                <td>
                    <a href="mailto:${contact.email}" class="email-link">
                        ${contact.email}
                    </a>
                </td>
                <td>${contact.socialNetworkID}</td>
                <td>${contact.notes}</td>
            </tr>
        `).join('');
    }

    downloadContacts() {
        const headers = [
            'Category',
            'First Name',
            'Last Name',
            'Business/Company',
            'Personal Contact',
            'Business Contact',
            'Email',
            'Social Network ID',
            'Notes'
        ];

        const csvContent = [
            headers.join(','),
            ...this.contacts.map(contact => [
                contact.category,
                contact.firstName,
                contact.lastName,
                contact.businessCompany,
                contact.personalContact,
                contact.businessContact,
                contact.email,
                contact.socialNetworkID,
                contact.notes
            ].map(field => `"${field}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'contacts.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Initialize the contact manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactManager();
});