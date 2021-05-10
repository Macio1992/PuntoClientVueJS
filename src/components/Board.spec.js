import { mount } from '@vue/test-utils';
import Board from './Board.vue';
import PuntoCard from './PuntoCard.vue';

describe("Board", () => {
  test('should load board in template', async () => {
    const wrapper = mount(Board);
    expect(wrapper.html()).toBeTruthy();
    expect(wrapper.findAll('.board__row').length).toBe(6);
    expect(wrapper.findAll('.board__cell').length).toBe(36);
  });

  test('should show punto card when board cell has been clicked', async () => {
    const wrapper = mount(Board, {
      props: {
        option: 'three_dot_card',
        color: 'red'
      }
    });

    await wrapper.findAll(".board__cell")[0].trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.findAllComponents(PuntoCard).length).toBe(1);
    expect(wrapper.vm.board[0][0]).toBe("three_dot_card");
    expect(wrapper.findAll(".board__cell")[0].html()).toContain('puntoCard');
  });
});
