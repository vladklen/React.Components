import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import AnimeContextProvider from '../../../src/context/Context';
import Pagination from '../../../src/components/UI/Pagination/Pagination';
import { paginationProps } from '../../mocks/AnimeRespone';

const PAGE = 5;
const CLICK_PAGE = 3;

const renderPagination = () => {
  render(
    <AnimeContextProvider>
      <Pagination {...paginationProps} />
    </AnimeContextProvider>,
    { wrapper: BrowserRouter }
  );
};

describe('Pagination tests', () => {
  let urlPage: URL;
  beforeEach(() => {
    renderPagination();
    urlPage = new URL(window.location.href);
    urlPage.searchParams.set('page', String(PAGE));
  });

  test('Updates URL query parameter when click next page', () => {
    const pageValuePrev = urlPage.searchParams.get('page');

    const nextBtn: HTMLButtonElement = screen.getByLabelText('Next page');
    console.log(nextBtn);
    fireEvent.click(nextBtn);

    const url = new URL(window.location.href);
    const pageValue = url.searchParams.get('page');

    expect(pageValue).toBe(String(Number(pageValuePrev) + 1));
  });

  test('Updates URL query parameter when click prev page', () => {
    const pageValuePrev = urlPage.searchParams.get('page');

    const prevBtn: HTMLButtonElement = screen.getByLabelText('Previous page');
    fireEvent.click(prevBtn);

    const url = new URL(window.location.href);
    const pageValue = url.searchParams.get('page');

    expect(pageValue).toBe(String(Number(pageValuePrev) - 1));
  });

  test('Updates URL query parameter when click page', () => {
    const pageBtn: HTMLButtonElement = screen.getByLabelText(
      `Page ${CLICK_PAGE}`
    );
    fireEvent.click(pageBtn);

    const url = new URL(window.location.href);
    const pageValue = url.searchParams.get('page');

    expect(pageValue).toBe(String(CLICK_PAGE));
  });
});
