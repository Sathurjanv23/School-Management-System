package com.sms.backend.service;

import com.sms.backend.model.Activity;
import com.sms.backend.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    public Activity addActivity(Activity activity) {
        return activityRepository.save(activity);
    }

    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    public Activity updateActivity(String id, Activity updatedActivity) {
        Optional<Activity> optionalActivity = activityRepository.findById(id);

        if (optionalActivity.isPresent()) {
            Activity existing = optionalActivity.get();
            existing.setStudentId(updatedActivity.getStudentId());
            existing.setStudentName(updatedActivity.getStudentName());
            existing.setActivityType(updatedActivity.getActivityType());
            existing.setActivityName(updatedActivity.getActivityName());
            existing.setDescription(updatedActivity.getDescription());
            existing.setDate(updatedActivity.getDate());
            existing.setResult(updatedActivity.getResult());
            existing.setRemarks(updatedActivity.getRemarks());

            return activityRepository.save(existing);
        }

        return null;
    }

    public void deleteActivity(String id) {
        activityRepository.deleteById(id);
    }
}