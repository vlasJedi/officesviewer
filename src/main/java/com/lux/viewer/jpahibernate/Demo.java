package com.lux.viewer.jpahibernate;

import com.lux.viewer.jpahibernate.models.Bid;
import com.lux.viewer.jpahibernate.models.Item;
import com.lux.viewer.jpahibernate.models.StoreUser;
import com.lux.viewer.jpahibernate.models.StoreUserDetails;
import com.lux.viewer.jpahibernate.repositories.BidRepository;
import com.lux.viewer.jpahibernate.repositories.ItemRepository;
import com.lux.viewer.jpahibernate.repositories.StoreUserDetailsRepository;
import com.lux.viewer.jpahibernate.repositories.StoreUserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Component
public class Demo {
    private final ItemRepository itemRepository;
    private final StoreUserRepository storeUserRepository;
    private final StoreUserDetailsRepository storeUserDetailsRepository;
    private final BidRepository bidRepository;

    private boolean isInit = false;
    @Autowired
    public Demo(
            ItemRepository itemRepository,
            StoreUserRepository storeUserRepository,
            StoreUserDetailsRepository storeUserDetailsRepository,
            BidRepository bidRepository) {
        this.itemRepository = itemRepository;
        this.storeUserRepository = storeUserRepository;
        this.storeUserDetailsRepository = storeUserDetailsRepository;
        this.bidRepository = bidRepository;
    }
    @Transactional
    public void run() {

        int[] init = new int[] {1, 2, 0 , 0 , 5, 7, 0};

//        int toReplaceIndex = -1;
//        int index = 0;
//        while(toReplaceIndex == -1) {
//            if (init[index] != 0) {
//                toReplaceIndex = index;
//                break;
//            }
//            index++;
//        }
//        BinaryOperator<Integer> findNext = (start, end) -> {
//            int index = start;
//            while(true) {
//                if (end == index) {
//                    return -1;
//                }
//                if (init[index] != 0) {
//                    return index;
//                }
//                index++;
//            }
//        };
//        int toReplaceIndex = findNext.apply(0, init.length - 1);
//        if (toReplaceIndex == -1) {
//            System.out.println("*** No need modification");
//            return;
//        }
//        int nonZeroIndex = toReplaceIndex;
//        for (int i = toReplaceIndex + 1; i < init.length; i++) {
//            int toSwap = init[i];
//            if (toSwap != 0) continue;
//            init[i] = init[nonZeroIndex];
//            init[nonZeroIndex] = toSwap;
//            if (i == init.length - 1) {
//                System.out.println("*** Finished");
//                break;
//            }
//            nonZeroIndex = findNext.apply(nonZeroIndex + 1, i);
//            if (nonZeroIndex == -1) {
//                System.out.println("*** Finished");
//                break;
//            }
//        }
        int[] result = new int[init.length];
        for (int i = init.length - 1; i > 0; i--) {
            if (init[i] != 0) continue;
            int zeroIndex = i;
            for (int j = i - 1; j >= 0; j--) {
                int checked = init[j];
                if (checked == 0) continue;
                init[j] = init[zeroIndex];
                init[zeroIndex] = checked;
                zeroIndex = j;
            }
        }


        Arrays.stream(init).forEach(item -> System.out.println("*** moved zeros to beginning" + item));


        Item item;
        Bid bid1;
        Bid bid2;
        StoreUser user1;
        StoreUser user2;
        StoreUserDetails storeUserDetails1;
        StoreUserDetails storeUserDetails2;
        // storeUserRepository.getReferenceById()
        if (!isInit) {
            item = new Item();
            bid1 = new Bid();
            bid2 = new Bid();
            bid1.setItem(item);
            bid2.setItem(item);

            Set<Bid> bids = new HashSet<>();
            bids.add(bid1);
            bids.add(bid2);

             item.setBids(bids);

            itemRepository.save(item);

            bidRepository.save(bid1);
            bidRepository.save(bid2);

            item = new Item();
            bid1 = new Bid();
            bid2 = new Bid();
            bid1.setItem(item);
            bid2.setItem(item);

            bids = new HashSet<>();
            bids.add(bid1);
            bids.add(bid2);

             item.setBids(bids);

            itemRepository.save(item);

            bidRepository.save(bid1);
            bidRepository.save(bid2);

//              user1 = new StoreUser();
//              storeUserDetails1 = new StoreUserDetails();
//              storeUserDetails1.setStoreUser(user1);
//
//              storeUserRepository.save(user1);
//              storeUserDetailsRepository.save(storeUserDetails1);
//
//              user2 = new StoreUser();
//              storeUserDetails2 = new StoreUserDetails();
//              storeUserDetails2.setStoreUser(user2);
//
//              storeUserRepository.save(user2);
//              storeUserDetailsRepository.save(storeUserDetails2);

//            for (Item itemI : itemRepository.findAll()) {
//                int count = itemI.getBids().size();
//                System.out.println("*** Bids total number is: " + count);
//            }
        }
        isInit = true;

//        for (StoreUserDetails details : storeUserDetailsRepository.findAll()) {
//            StoreUser user = details.getStoreUser();
//            System.out.println("*** Fetched next used id: " + user.getId());
//        }

//        List<Item> items = itemRepository.findAll();
//        item = items.get(0);
//
//        List<Bid> bids = bidRepository.findAll();
//        bid1 = bids.get(0);
//        item = bid1.getItem();
//        System.out.println("*** Fetched item from bid1" + item.getId());
//        bid2 = bids.get(1);
//        item = bid2.getItem();
//        System.out.println("*** Fetched item from bid2" + item.getId());

//        for (Bid bid : bidRepository.findAll()) {
//            Item itemI = bid.getItem();
//            System.out.println("*** In loop new item id: " + itemI.getId());
//        }
//        for (Item item1 : itemRepository.findItemsWithRelatedBids()) {
//            Set<Bid> bids = item1.getBids();
//            System.out.println("*** In loop bids count is: " + bids.size());
//        }
        // item = itemRepository.findAll().get(0);


        Map<Integer, Integer> map = new HashMap<>();

    }
}
