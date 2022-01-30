import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import {
  FormContact,
  LabelFormContact,
  TextFormContact,
  InputFormContact,
  ButtonFormContact,
} from './PhonebookForm.styled';

export default function PhonebookForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const submitForm = e => {
    e.preventDefault();
    const id = nanoid();
    onSubmit({ id, name, number });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <FormContact autoComplete="off" onSubmit={submitForm}>
        <LabelFormContact>
          <TextFormContact>Name</TextFormContact>
          <InputFormContact
            placeholder="Enter a name"
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </LabelFormContact>
        <LabelFormContact>
          <TextFormContact>Number</TextFormContact>
          <InputFormContact
            placeholder="Enter a number"
            type="tel"
            name="number"
            value={number}
            onChange={e => setNumber(e.target.value)}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </LabelFormContact>
        <ButtonFormContact type="submit">Add contact</ButtonFormContact>
      </FormContact>
    </>
  );
}

PhonebookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
