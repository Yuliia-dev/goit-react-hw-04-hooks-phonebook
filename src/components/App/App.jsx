import { useState } from 'react';
import Swal from 'sweetalert2';
import useLocalStorage from '../../hooks/useLocalStorage';
import PhonebookForm from '../PhonebookForm/PhonebookForm';
import Filter from '../Filter/Filter';
import Contacts from '../ContactsList/ContactsList';
import { Container, TitlePhonebook, TitleContacts } from './App.styled';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const onSubmitHandling = ({ id, name, number }) => {
    if (contacts.name !== name) {
      const contact = {
        id,
        name,
        number,
      };
      const normalizedNameContact = name.toLowerCase();

      checkForCopyingContact(normalizedNameContact)
        ? Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: `The name ${name} is already in the list`,
          })
        : setContacts(prevState => [...prevState, contact]);
    }
  };

  const checkForCopyingContact = name => {
    return contacts.find(contact => contact.name.toLowerCase() === name);
  };

  const searchNameOnList = e => {
    setFilter(e.target.value);
  };

  const delateContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const visibleContact = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  };

  return (
    <Container>
      <TitlePhonebook>Phonebook</TitlePhonebook>
      <PhonebookForm onSubmit={onSubmitHandling} />

      <TitleContacts>Contacts</TitleContacts>
      <Filter value={filter} searchName={searchNameOnList} />
      <Contacts deleteContact={delateContact} contacts={visibleContact()} />
    </Container>
  );
}
