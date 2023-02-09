package com.lux.viewer.jpahibernate;

import com.lux.viewer.jpahibernate.models.Item;
import com.lux.viewer.jpahibernate.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class Demo {
    private final ItemRepository itemRepository;
    @Autowired
    public Demo(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
        run();
    }
    public void run() {
        List<Item> items = itemRepository.findAll();
        Item item = new Item();
        Calendar cal = Calendar.getInstance();
        cal.set(2034, Calendar.FEBRUARY, 8);
        item.setAuctionEnd(cal.getTime());
        item.setName("gloves");
        itemRepository.save(item);
        Map<Integer, Integer> map = new HashMap<>();
        // Stream.of(1, 2, 3).forEach((val) -> map.put(val, val));

    }
}
