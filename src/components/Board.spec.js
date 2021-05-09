import { mount } from '@vue/test-utils';
import Board from './Board.vue';
import PuntoCard from './PuntoCard.vue';

// znajdz outside template

describe.skip("Board", () => {
  it('should be true', async () => {
    const wrapper = mount(Board);
    expect(wrapper.html()).toBeTruthy();
    expect(wrapper.findAll('.board__row').length).toBe(6);
    expect(wrapper.findAll('.board__cell').length).toBe(36);
  });

  it('should be true 2', async () => {
    const wrapper = mount(Board, {
      props: {
        option: 'three_dot_card',
        color: 'red'
      }
    });

    // const cells = wrapper.findAll('.board__cell')[0];
    // console.log('cells ', cells);

    await wrapper.findAll(".board__cell")[0].trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.findAllComponents(PuntoCard).length).toBe(1);
  });
});
