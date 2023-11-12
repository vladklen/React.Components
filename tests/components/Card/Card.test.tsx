import { describe, expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Card } from '../../../src/components/Card/Сard';
import { MemoryRouter } from 'react-router-dom';
import React, { useContext } from 'react';

const CardData = {
  title: 'Test title',
  image: 'https://cdn.myanimelist.net/images/anime/1969/112604.jpg',
  id: 1231231,
};

describe('Test CardList component', () => {
  test('Ensure that the card component renders the relevant card data;', () => {
    const wrapper = render(
      <MemoryRouter>
        <Card {...CardData} />
      </MemoryRouter>
    );

    expect(wrapper.container).toMatchSnapshot();
  });
});
